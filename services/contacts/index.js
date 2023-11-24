const mailchimp = require('@mailchimp/mailchimp_marketing');
const config = require('../../config');
const axios = require('axios');
const log = require('../../logger');

const API_CONTACTS_URL = config.API_BASE_URL + '/contacts';

mailchimp.setConfig(config.MAILCHIMP_CONFIG);

async function ping() {
  const response = await mailchimp.ping.get();
  log.info(response);
}

async function createList() {
  const response = await mailchimp.lists.createList(config.MAILCHIMP_LIST_CONFIG);

  log.info(
    `Successfully created a Mailchimp list (audience) with id: ${response.id}. ✅`
  );
  return response;
}

async function setupList() {
  const response = await mailchimp.lists.getAllLists();
  // First, check if response and response.lists exist
  if (response && response.lists) {
    // Search in the list of lists for one with the name equal to event.name
    const listWithName = response.lists.find(list => list.name === config.MAILCHIMP_EVENT_NAME);
    if (listWithName) {
        log.info(`A list with the name: "${config.MAILCHIMP_EVENT_NAME}" was found. ✅`);
        return listWithName;
    } else {
        log.info(`No list with the name: "${config.MAILCHIMP_EVENT_NAME}" was found. So it will be created. ⚠️`);
        return await createList();
    }
  } else {
    log.error('Error in Mailchimp client response. It does not have the lists element or is undefined. ❌');
  }
};

async function getApiContacts() {
  try {
      const response = await axios.get(API_CONTACTS_URL);
      return response.data;
  } catch (err) {
      log.error('Error fetching contacts from API:', err);
      return [];
  }
}

async function addMailchimpContact(listId, contact) {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: contact.email,
    status: config.MAILCHIMP_INITIAL_CONTACT_STATUS,
    merge_fields: {
      FNAME: contact.firstName,
      LNAME: contact.lastName,
    }
  });

  return response;
}

async function sync() {
  await ping();
  const list = await setupList();
  const sourceContacts = await getApiContacts();
  const response = {
      syncedContacts: 0,
      contacts: [],
  };

  // Splitting the contacts into batches based on ADD_CONCURRENCY_SIZE
  const contactBatches = [];
  for (let i = 0; i < sourceContacts.length; i += config.ADD_CONCURRENCY_SIZE) {
      contactBatches.push(sourceContacts.slice(i, i + config.ADD_CONCURRENCY_SIZE));
  }

  // Process each batch using Promise.all or Promise.allSettled
  for (const batch of contactBatches) {
      const promises = batch.map(contact => addMailchimpContact(list.id, contact).catch(err => {
          log.error('Error Adding contact to Mailchimp list:', err);
          return null; // Return null or an appropriate error response
      }));

      log.info(`promises.length: ${promises.length}`);

      const results = await Promise.allSettled(promises);
      for (const result of results) {
          if (result.status === 'fulfilled' && result.value) {
              response.syncedContacts++;
              const { email_address: email, merge_fields: { FNAME: firstName, LNAME: lastName } } = result.value;
              response.contacts.push({ firstName, lastName, email });
          }
      }
  }

  return response;
}

module.exports = {
  sync,
};