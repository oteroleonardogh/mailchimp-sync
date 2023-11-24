require('dotenv').config();

const config = {
    PORT: Number(process.env.PORT),
    API_BASE_URL: process.env.API_BASE_URL,
    ADD_CONCURRENCY_SIZE: Number(process.env.ADD_CONCURRENCY_SIZE),
    MAILCHIMP_EVENT_NAME: process.env.MAILCHIMP_EVENT_NAME,
    MAILCHIMP_INITIAL_CONTACT_STATUS: process.env.MAILCHIMP_INITIAL_CONTACT_STATUS,
    MAILCHIMP_CONFIG: {
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER,
    },
    MAILCHIMP_LIST_CONFIG: {
        name: process.env.MAILCHIMP_EVENT_NAME,
        contact: {
            company: process.env.MAILCHIMP_FOOTER_CONTACT_INFO_COMPANY,
            address1: process.env.MAILCHIMP_FOOTER_CONTACT_INFO_ADDRESS1,
            city: process.env.MAILCHIMP_FOOTER_CONTACT_INFO_CITY,
            zip: process.env.MAILCHIMP_FOOTER_CONTACT_INFO_ZIP,
            state: process.env.MAILCHIMP_FOOTER_CONTACT_INFO_STATE,
            country: process.env.MAILCHIMP_FOOTER_CONTACT_INFO_COUNTRY,
        },
        permission_reminder: 'permission_reminder',
        email_type_option: true,
        campaign_defaults: {
            from_name: process.env.MAILCHIMP_CAMPAIGN_FROM_NAME,
            from_email: process.env.MAILCHIMP_CAMPAIGN_FROM_EMAIL,
            subject: process.env.MAILCHIMP_CAMPAIGN_SUBJECT,
            language: process.env.MAILCHIMP_CAMPAIGN_LANGUAJE,
        },
    },
};

module.exports = config;
