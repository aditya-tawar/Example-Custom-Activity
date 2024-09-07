const { userApi } = require('./zaloexcute')
const { client } = require('./mcApi')
const { aVinhApi } = require('./postAVInh')
require('dotenv').config()
exports.ZaloRequest = (
  token,
  zaloId,
  title,
  message,
  urlimg,
  url,
  journeyId,
  activityId,
  ContactID,
  brand,
  inputVals,
  OCSID,
  messageType,
  sub2,
  contentName
) => {
  const options = {
    Name: process.env.SENT_TABLE,
    props: {
      id: journeyId + activityId + ContactID + Date.now(),
      journeyid: journeyId,
      activityid: activityId,
      zaloId: zaloId,
      status: '',
      message: '',
      messageid: '',
      contactid: ContactID,
      brand: brand,
      IsTransactional: messageType || 'TS',
      OCSID,
      contentName
    },
  }

  // Call ZALo AXios here
  const user = userApi(
    token,
    zaloId,
    title,
    message,
    urlimg,
    url,
    inputVals,
    brand,
    messageType,
    sub2
  )
  let deRow = client.dataExtensionRow(options)
  user
    .then(function (response) {
      if (response.data.error) {
        options.props.message = response.data.message
        options.props.status = 'error' + response.data.error

        console.log(response.data.message)
        deRow.post(function (err, response) {
          if (err) {
            console.log('import data to de fail, zalo request reponse error message', err.message)
          } else {
            console.log('import data to de success, zalo request reponse error message')
          }
        })

      } else {
        options.props.status = 'success'
        options.props.message = response.data.message
        options.props.messageid = response.data.data.message_id
        console.log(response.data.message)

        deRow.post(function (err, response) {
          if (err) {
            console.log('import data to de fail, zalo request reponse success', err.message)
          } else {
            console.log('import data to de success, zalo request reponse success')
          }
        })

      }
    })
    .catch(function (error) {
      console.log('zalo connect is fail', error.message)
      options.props.status = 'fail'
      deRow.post(function (err, response) {
        if (err) {
          console.log('import data to de fail,zalo connect is fail', err.message)
        } else {
          console.log('import data to de success,zalo connect is fail')
        }
      })
    })
}
