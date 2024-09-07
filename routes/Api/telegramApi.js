const { userApi } = require('./telegramExecute')
const { client } = require('./mcApi')
require('dotenv').config()
exports.TelegramRequest = (
  payload,
  signature,
  brand,
  journeyId,
  activityId,
  TelegramID
) => {

    // Demo
    const options = {
        Name: process.env.SENT_TABLE,
        props: {
          id: TelegramID + Date.now(),
          status: '',
          message: '',
          messageid: '',
          brand: `${brand}`,
        },
      }

  // Call ZALo AXios here
  const user = userApi(
    payload,
    signature
  )
  let deRow = client.dataExtensionRow(options)
  user
    .then(function (response) {
      let res = JSON.stringify(response)
      console.log(res)
      


      // Call Telegram backend

      // if (!response.data.success) {

      //   console.log("Go on if 'error'")

      //   options.props.message = response.data.message
      //   options.props.status = 'error'

      //   //console.log(response.data.message)
      //   deRow.post(function (err, response) {
      //     if (err) {
      //       console.error('import data to de fail, telegram chatbot request reponse error message', err.message)
      //     } else {
      //       console.log('import data to de success, telegram chatbot request reponse error message')
      //     }
      //   })

      // } else {
      //   console.log("Go on if 'success'")
      //   options.props.status = 'success'
      //   options.props.message = response.data.message
      //   options.props.messageid = "telegramId" // (Update later)
      //   console.log(options)

      //   deRow.post(function (err, response) {
      //     if (err) {
      //       console.error('import data to de fail, telegram chatbot request reponse success', err.message ) 
      //     } else {
      //       console.log('import data to de success, telegram chatbot request reponse success')
      //     }
      //   })
      // }
    })
    .catch(function (error) {
      console.error('call api to telegram chatbot error', error.message)
      options.props.status = 'fail'
      deRow.post(function (err, response) {
        if (err) {
          console.error('import data to de fail,telegram chatbot connect is fail', err.message)
        } else {
          console.log('import data to de success,telegram chatbot connect is fail')
        }
      })
    })
}
