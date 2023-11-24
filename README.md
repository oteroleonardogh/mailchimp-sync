# Mailchimp Sync Service

## Description

This application syncs contacts from MockAPI to Mailchimp. It's built using Node.js and Fastify and includes testing with Jest.

## Features

- Sync contacts from a predefined MockAPI to a Mailchimp list.
- Sync works in parallel without exceding Mailchimp API concurrency limit.
- Uses Fastify for efficient server-side operations.
- Unit tests with Jest.

## Project Walkthrough Video

For a detailed walkthrough of this project, watch my video here: [Video Link](video_link)
  
## Getting Started

### Prerequisites

- Node.js (Version 18.15.0): You can use `nvm use` to install the configured version in *.nvmrc* file

## Installation

1. **Clone the Repository**

```bash
git clone [repository-url]
cd mailchimp-sync
```

2. **Install Dependencies**

Run the following command to install the necessary dependencies:

```bash
npm install
```

## Configuration

Create a *.env* file in the root of the project and add the following environment variables:

```
// MAILCHIMP CONFIG
MAILCHIMP_API_KEY=[YOUR_MAILCHIMP_API_KEY]
MAILCHIMP_SERVER=us21
MAILCHIMP_EVENT_NAME=Leonardo Otero
MAILCHIMP_INITIAL_CONTACT_STATUS=subscribed

MAILCHIMP_CAMPAIGN_FROM_NAME=Leonardo Otero
MAILCHIMP_CAMPAIGN_FROM_EMAIL=oteroleonardo@gmail.com
MAILCHIMP_CAMPAIGN_LANGUAJE=EN_US

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

## Starting the Server

To start the server, run:

```bash
npm start
```

## Usage

After starting the server, you can access the service at `http://localhost:<PORT>/contacts/sync` to synchronize the contacts from MockAPI to Mailchimp.
