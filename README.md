# Mailchimp Sync Service

## Description

This application syncs contacts from MockAPI to Mailchimp. It's built using Node.js and Fastify and includes testing with Jest.

## Features

- Sync contacts from a predefined MockAPI to a Mailchimp list.
- Sync works in parallel without exceeding Mailchimp API concurrency limit.
- Uses a Serverless approach for efficient and autoscalable operations.
- Out of the box ready to be deployed in Vercel
- Unit tests with Jest.

## Technical Design

A Technical Design Document (TDD) may be found [here](https://docs.google.com/document/d/1C3H6NfypNfUvZXkITErf2MjLpeTDUAf0zlnszk32zgM/edit?usp=sharing)

## Project Walkthrough Video

For a detailed walkthrough of this project, watch my video here: [Video Link](video_link)
  
## Getting Started

### Prerequisites

- Node.js (Version 18.15.0): You can use `nvm use` to install the configured version in *.nvmrc* file

## Installation

1. **Clone the Repository**

```bash
git clone [[repository-url]](https://github.com/oteroleonardogh/mailchimp-sync.git)
cd mailchimp-sync
```

2. **Install Dependencies**

Run the following command to install the necessary dependencies:

```bash
npm install
```

## Configuration

Create a *.env* file in the root of the project and add the following environment variables:

```bash
// MAILCHIMP CONFIG
MAILCHIMP_API_KEY=[YOUR_MAILCHIMP_API_KEY]
MAILCHIMP_SERVER=us21
MAILCHIMP_EVENT_NAME=Leonardo Otero
MAILCHIMP_INITIAL_CONTACT_STATUS=subscribed

MAILCHIMP_CAMPAIGN_FROM_NAME=Leonardo Otero
MAILCHIMP_CAMPAIGN_FROM_EMAIL=oteroleonardo@gmail.com
MAILCHIMP_CAMPAIGN_LANGUAGE=EN_US

MAILCHIMP_FOOTER_CONTACT_INFO_COMPANY=company
MAILCHIMP_FOOTER_CONTACT_INFO_ADDRESS1=Address 1
MAILCHIMP_FOOTER_CONTACT_INFO_CITY=city
MAILCHIMP_FOOTER_CONTACT_INFO_ZIP=zip
MAILCHIMP_FOOTER_CONTACT_INFO_STATE=state
MAILCHIMP_FOOTER_CONTACT_INFO_COUNTRY=country

// MOCKAPI
API_BASE_URL=https://challenge.trio.dev/api/v1

ADD_CONCURRENCY_SIZE=10
PORT=3000
```

### Running Tests

To run the unit tests, execute:

```bash
npm test
```

## Deploying Sync service

To deploy and try the Sync service, you will first need to install vercel-cli:

```bash
npm i -g vercel
```

Once vercel-cli is installed, you will need to sign-up and login with you Vercel user:

```bash
vercel login oteroleonardo@gmail.com
```

Now, to deploy and try the Sync service, navigate to the project root folder and execute the following command:

```bash
vercel
```

The Vercel command should print out a message with a *Preview URL* (the URL provided by Vercel after deployment) like the following one after completing its deployment:

```bash
Vercel CLI 32.5.6
🔍  Inspect: https://vercel.com/leonardo-oteros-projects/mailchimp-sync/H35SnuZqKAydoKGzise7T4LtwptW [3s]
✅  Preview: https://mailchimp-sync-m04zsmxrv-leonardo-oteros-projects.vercel.app [3s]
📝  To deploy to production (mailchimp-sync.vercel.app), run `vercel --prod`
```

## Credentials Security Considerations

As there are critical values like MAILCHIMP_API_KEY that should not be openly shared, Vercel provides a solution. The first time you deploy the *mailchimp-sync* project, go to the project's settings and add a valid MAILCHIMP_API_KEY entry in the Environment Variables section. This will replace the placeholder value in the .env file. You may need to redeploy the project for this change to take effect.

## Usage

After deploying and starting the Sync service you should be able to access it by appending `/contacts/sync` to the URL provided by Vercel (e.g. https://mailchimp-sync-m04zsmxrv-leonardo-oteros-projects.vercel.app/contacts/sync). The Sync service should be launched and provide a response like the following one:

```yaml
{
    "syncedContacts":24,
    "contacts":[
                {"firstName":"Michelle","lastName":"Gaylord","email":"Kirk.Fritsch424@yahoo.com"},
                {"firstName":"Deborah","lastName":"Schinner","email":"Corbin.Abshire32@yahoo.com"},
                {"firstName":"Jessika","lastName":"Auer","email":"Dillon167@hotmail.com"},
                {"firstName":"Geo","lastName":"Schmitt","email":"Cierra_Walsh683@gmail.com"},
                {"firstName":"Floyd","lastName":"Gerlach","email":"Adalberto91@icloud.com"},
                {"firstName":"Hoyt","lastName":"Grady","email":"Elvie.Hagenes631@hotmail.com"},
                {"firstName":"Royce","lastName":"Kunze","email":"Dallin_Powlowski999@gmail.com"},
                {"firstName":"Eileen","lastName":"Schowalter","email":"Jameson698@yahoo.com"},
                {"firstName":"Leonie","lastName":"Strosin","email":"Raheem.DAmore433@yahoo.com"},
                {"firstName":"Noemie","lastName":"Gleichner","email":"Cristina538@icloud.com"},
                {"firstName":"Kaleb","lastName":"Robel","email":"Leonel.Sipes132@gmail.com"},
                {"firstName":"Harold","lastName":"Mann","email":"Alexys_Aufderhar172@hotmail.com"},
                {"firstName":"Danyka","lastName":"Witting","email":"Jamil787@yahoo.com"},
                {"firstName":"Alvena","lastName":"Marks","email":"Trace.Johnston464@icloud.com"},
                {"firstName":"Christopher","lastName":"Marquardt","email":"Felipe25@outlook.com"},
                {"firstName":"Tod","lastName":"Stehr","email":"Reginald_Bechtelar651@hotmail.com"},
                {"firstName":"Delphia","lastName":"Huels","email":"Myrtis668@icloud.com"},
                {"firstName":"Nels","lastName":"Brakus","email":"Rebeka_Thompson946@gmail.com"},
                {"firstName":"Bethel","lastName":"Rau","email":"Benedict_Kunze777@gmail.com"},
                {"firstName":"Charley","lastName":"Hermann","email":"Jennie.Kessler284@outlook.com"},
                {"firstName":"Cole","lastName":"Zieme","email":"Terrance182@outlook.com"},
                {"firstName":"Lee","lastName":"Runolfsson","email":"Jackie675@gmail.com"},
                {"firstName":"Zander","lastName":"Greenholt","email":"Austin545@yahoo.com"},
                {"firstName":"Rene","lastName":"Nienow","email":"Michael_Dach764@outlook.com"}
    ]
}
```
