const ET_Client = require('sfmc-fuelsdk-node')

const clientId = process.env.CLIENT_ID

const clientSecret = process.env.CLIENT_SECRET

const stack = process.env.STACK

const originURI = process.env.originURI

const obj = {
  origin: 'https://'+originURI+'.rest.marketingcloudapis.com/',

  authOrigin: 'https://'+originURI+'.auth.marketingcloudapis.com/',

  soapOrigin: 'https://'+originURI+'.soap.marketingcloudapis.com/',

  authOptions: {
    authVersion: 2,

    accountId: process.env.ACCOUNT_ID,
  },
}
exports.client = new ET_Client(clientId, clientSecret, stack, obj)
