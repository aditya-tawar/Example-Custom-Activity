const axios = require('axios')
require('dotenv').config()
exports.aVinhApi = (option) => {
  var axios = require('axios')
  var data = JSON.stringify(option)

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.3anutrition.com/api/ZSent',
    headers: {
      Authorization: process.env.AVINHTOKEN,
      'Content-Type': 'application/json',
    },
    data: data,
  }

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}
