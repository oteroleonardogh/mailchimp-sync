const { sync } = require('./services/contacts');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const axios = require('axios');

jest.mock('@mailchimp/mailchimp_marketing');
jest.mock('axios');

describe('sync function', () => {
    it('should sync contacts correctly', async () => {
        // Setup mock responses
        axios.get.mockResolvedValue({
            data: [
                { firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com' },
                { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com' }
            ],
        });
        

        // Mock for getting all lists
        mailchimp.lists.getAllLists.mockResolvedValue({
            lists: [{ id: 'mock-list-id', name: 'Mock List' }]
        });

        // Mock for creating a list
        mailchimp.lists.createList.mockResolvedValue({
            id: 'new-mock-list-id'
        });

        mailchimp.lists.addListMember.mockImplementation((listId, member) => {
            return Promise.resolve(member); // Simplified mock implementation
        });

        // Call the sync function
        const result = await sync();

        // Assertions
        expect(result.syncedContacts).toBe(2); // Expect 2 contacts to be synced
        expect(result.contacts.length).toBe(2);
        expect(result.contacts[0].email).toBe('johndoe@example.com');
        // ... other assertions as needed
    });

    // ... other test cases
});
