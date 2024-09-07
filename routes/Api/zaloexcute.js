const axios = require('axios')

exports.userApi = (
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
) => {
  let newinputVals
  if (inputVals) {
    newinputVals = inputVals.map((item, i) => {
      let payload;
      if (item.default_action.type == 'oa.open.url') {
        payload = {
          url: item.default_action.url,
        };
      } else if (item.default_action.type == 'oa.query.show') {
        payload = item.default_action.url;
      }
      return {
        title: item.title.length > 35 ? item.title.substring(0, 30) + ' ...' : item.title,
        image_icon: item.image_url,
        type: item.default_action.type,
        payload: payload,
      }
    })
  }

  let newinputValsCS
  if (inputVals) {
    newinputValsCS = inputVals.map((item, i) => {
      let payload;
      if (item.default_action.type == 'oa.open.url') {
        payload = {
          url: item.default_action.url,
        };
      } else if (item.default_action.type == 'oa.query.show') {
        payload = item.default_action.url;
      }
      return {
        title: item.title.length > 100 ? item.title.substring(0, 95) + ' ...' : item.title,
        type: item.default_action.type,
        payload: payload,
      }
    })
  }
  var psObject = {
    recipient: {
      user_id: zaloId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'promotion',
          elements: [
            {
              image_url: urlimg,
              type: 'banner',
            },
            {
              type: 'header',
              content: title,
            },
            {
              type: 'text',
              align: 'left',
              content: message,
            },
          ],
          buttons: [...newinputVals],
        },
      },
    },
  }
  let messageCS = message ? (message.replaceAll(/\r?\n|\r/g, '')).replaceAll('<br>', '\n') : ''
  
  var csImgObject = {
    recipient: {
      user_id: zaloId,
    },
    message: {
      text: title + '\n' + messageCS,
      attachment: {
        type: 'template',
        payload: {
          template_type: 'media',
          elements: [
            {
              media_type: 'image',
              url: urlimg,
            },
          ],
          buttons: [...newinputValsCS],
        },
      },
    },
  }
  var csTextObject = {
    recipient: {
      user_id: zaloId,
    },
    message: {
      text: title + '\n' + messageCS,
      attachment: {
        type: 'template',
        payload: {
          buttons: [...newinputValsCS],
        },
      }
    },
  }
  var sendObject = {
    recipient: {
      user_id: zaloId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'transaction_membership',
          language: 'VI',
          elements: [
            {
              image_url: urlimg,
              type: 'banner',
            },
            {
              type: 'header',
              content: title.length > 100 ? title.substring(0, 95) + ' ...' : title,
              align: 'left',
            },
            {
              type: 'text',
              align: 'left',
              content: message.length > 250 ? message.substring(0, 245) + ' ...' : message,
            },
            {
              type: 'table',
              content: [
                {
                  value: zaloId,
                  key: 'Mã KH',
                },
              ],
            },
          ],
          buttons: [
            ...newinputVals,
            {
              title: 'Xem thêm',
              image_icon: urlimg,
              type: 'oa.open.url',
              payload: {
                url: url,
              },
            },
          ],
        },
      },
    },
  }
  switch (messageType) {
    case 'CS':
      let objMessData;
      if(urlimg) {
        objMessData = csImgObject;
      } else {
        objMessData = csTextObject;
      }
      return axios({
        headers: { access_token: token },
        url: 'https://openapi.zalo.me/v3.0/oa/message/cs',
        method: 'post',
        data: objMessData,
      })
    case 'PS':
      if (sub2) {
        psObject.message.attachment.payload.elements.splice(3, 0, {
          type: 'text',
          align: 'left',
          content: sub2.length > 250 ? sub2.substring(0, 245) + ' ...' : sub2,
        })
      }
      return axios({
        headers: { access_token: token },
        url: 'https://openapi.zalo.me/v3.0/oa/message/promotion',
        method: 'post',
        data: psObject,
      })
    case 'TS':
      sendObject.message.attachment.payload.buttons.pop()
      if (sub2) {
        sendObject.message.attachment.payload.elements.splice(3, 0, {
          type: 'text',
          align: 'left',
          content: sub2.length > 250 ? sub2.substring(0, 245) + ' ...' : sub2,
        })
      }
      return axios({
        headers: { access_token: token },
        url: 'https://openapi.zalo.me/v3.0/oa/message/transaction',
        method: 'post',
        data: sendObject,
      })
    default:
      return axios({
        headers: { access_token: token },
        url: 'https://openapi.zalo.me/v3.0/oa/message/transaction',
        method: 'post',
        data: sendObject,
      })
  }
}
