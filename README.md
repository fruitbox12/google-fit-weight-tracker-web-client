## Weight tracker

This app uses the google fitness v1 rest API to store weight data.

To make your own app you will need a google cloud account and create your own credentials.

This repo will use my person oauth client ID for demonstration purposes.

To run:
```bash
git clone https://github.com/wichopy/google-fit-weight-tracker-web-client.git

cd google-fit-weight-tracker-web-client

npm install

npm start

open http://localhost:3333
```
Note: The app will only work on localhost at port 3333 as its the only whitelisted url

A .env file is provided to configure your own client ID.