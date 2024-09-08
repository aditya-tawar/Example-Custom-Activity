require('dotenv').config()

module.exports = function configJSON(req) {
  return {
    workflowApiVersion: '1.1',
    key: "323055e5-0ce2-405c-8923-34af6fec1e83",
    metaData: {
      icon: 'images/icon.png',
      iconSmall: 'images/icon.png',
      category: 'message',
    },
    type: 'REST',
    lang: {
      'en-US': {
        name: `Trial Telegram`,
        description: 'Trial Telegram',
        // step1Label: 'Content setup',
      },
    },
    arguments: {
      execute: {
        inArguments: [{
          "phone": "{{Contact.Attribute.Phone}}",
          "telegram_id": "{{Contact.Attribute.TelegramID}}"
        }
        ],
        outArguments: [],
        url: `https://examplecustomact.onrender.com/journeybuilder/execute`,
        verb: 'POST',
        body: '',
        header: '',
        format: 'json',
        //useJwt: true,
        timeout: 100000,
        retryCount: 5,
        concurrentRequests: 1,
      },
    },
    configurationArguments: {
      applicationExtensionKey: "323055e5-0ce2-405c-8923-34af6fec1e83",
      save: {
        url: `https://examplecustomact.onrender.com/journeybuilder/save`,
        verb: 'POST',
        //useJwt: true,
      },
      publish: {
        url: `https://examplecustomact.onrender.com/journeybuilder/publish`,
        verb: 'POST',
        //useJwt: true,
      },
      stop: {
        url: `https://examplecustomact.onrender.com/journeybuilder/stop`,
        verb: 'POST',
        //useJwt: true,
      },
      validate: {
        url: `https://examplecustomact.onrender.com/journeybuilder/validate`,
        verb: 'POST',
        //useJwt: true,
      },
    },
    wizardSteps: [
      {
        label: 'Configure Activity',
        key: 'step1',
      },
    ],
    userInterfaces: {
      configModal: {
        height: 600,
        width: 1000,
        fullscreen: false,
      },
    },
    schema: {
      arguments: {
        execute: {
          inArguments: [
            {
              "Phone": {
                "dataType": "Phone",
                "isNullable": false,
                "direction": "in"
              }
            },
            {
              "telegram_id": {
                "dataType": "Number",
                "isNullable": false,
                "direction": "in"
              }
            }
          ],
          outArguments: [],
        },
      },
    },
  }
}
