const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')


// replace the value below with the Telegram token you receive from @BotFather
//const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const token = '6512782567:AAH5MZuygsUfs-q7B9FnqW_jXBA-0SYNUbc'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

//   const chatId = msg.chat.id;
const chatId = '1113053153'

exports.userApi = (
  payload,
  signature,
) => {
    return bot.sendMessage(chatId, payload.text);

}

// Call telegram backend 

// exports.userApi = (
//   payload,
//   signature,
// ) => {

//   console.log(payload);
//   console.log(signature);
  
//   return axios({
//           headers: { Signature: signature, 'Content-Type': 'application/json' },
//           url: 'https://abbott.dev.bluecomvn.com/api/telegram/send-text-message',
//           method: 'post',
//           data: payload,
//         })
// }


