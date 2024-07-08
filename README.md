# AIDE Dashboard

## Getting Started

System Requirements:

1. [Node.js 16.8](https://nodejs.org/en) or later.
2. [pnpm - package manager](https://pnpm.io/installation#using-npm) (recommended)

First, install dependencies:

```bash
pnpm install
# or
npm run install
```

Now, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Auth for Google Sheet
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=<CREATE-YOUR-OWN-SERVICE-ACCOUNT>
GOOGLE_PRIVATE_KEY="<CREATE-API-ACCOUNT>"
SPREADSHEET_ID=<CHECK-SPREADSHEET-ID>
```

## Docker Compose

To run the production build, run:

```bash
version: "1.0"

services:
  aide-dashboard:
    image: docker.io/library/aide-dashboard
    ports:
      - "3000:3000"
    environment:
      GOOGLE_SERVICE_ACCOUNT_EMAIL: ${GOOGLE_SERVICE_ACCOUNT_EMAIL}
      GOOGLE_PRIVATE_KEY: ${GOOGLE_PRIVATE_KEY}
      SPREADSHEET_ID: ${SPREADSHEET_ID}
```
