'use strict';
var util = require('util');
const Path = require('path')
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'))
const CryptoJS = require('crypto-js')
require('dotenv').config()
const { client } = require('./Api/mcApi')
const { TelegramRequest } = require('./Api/telegramApi');
const { Console } = require('console');

exports.logExecuteData = [];

function logData(req) {
  exports.logExecuteData.push({
      body: req.body,
      headers: req.headers,
      trailers: req.trailers,
      method: req.method,
      url: req.url,
      params: req.params,
      query: req.query,
      route: req.route,
      cookies: req.cookies,
      ip: req.ip,
      path: req.path, 
      host: req.host,
      fresh: req.fresh,
      stale: req.stale,
      protocol: req.protocol,
      secure: req.secure,
      originalUrl: req.originalUrl
  });
  console.log("body: " + util.inspect(req.body));
  console.log("headers: " + req.headers);
  console.log("trailers: " + req.trailers);
  console.log("method: " + req.method);
  console.log("url: " + req.url);
  console.log("params: " + util.inspect(req.params));
  console.log("query: " + util.inspect(req.query));
  console.log("route: " + req.route);
  console.log("cookies: " + req.cookies);
  console.log("ip: " + req.ip);
  console.log("path: " + req.path);
  console.log("host: " + req.host);
  console.log("fresh: " + req.fresh);
  console.log("stale: " + req.stale);
  console.log("protocol: " + req.protocol);
  console.log("secure: " + req.secure);
  console.log("originalUrl: " + req.originalUrl);
}

/** POST Handler for /execute/ route of Activity.*/
exports.execute = function (req, res) {

  console.log("IN EXECUTE");
  console.log('req', req === undefined ? 'empty' : 'has');
  console.log('req.body', req.body);
  const journeyId = req.body.journeyId
  const activityId  = req.body.activityId
  const {
    nPayload,
    TelegramID,
    name,
    phone
  } =  req.body.inArguments[0]
  let { message, urlimg, brand } = nPayload
  
  // <-- Crypt payload process - Start
  function sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
  }

  var payload = {
    telegram_id: TelegramID, 
    text: message,
    timestamp: Date.now().toString()
  }

  var sortedPayload = sortObject(payload);
  var stringifyPayload = JSON.stringify(sortedPayload);
  var hash = CryptoJS.HmacSHA256(stringifyPayload, process.env.CHATBOT_KEY);
  const signature = CryptoJS.enc.Hex.stringify(hash);
  // Crypt payload process - End -->

  // Call to Telegram chat bot and log to DE
  try {
        TelegramRequest(
          payload,
          signature,
          brand,
          journeyId,
          activityId,
          TelegramID
        )
      } catch (error) {
        console.log(error)
        //return res.status(401).end()
      }
  res.status(200).send('Execute')

  //console.log(request.inArguments.nPayload)
  // JWT(req.body, process.env.jwtSecret, (err, decoded) => {
  // console.log('go on JWT')

  // if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
  //   console.log('Get success on decode')
  //   //const decodedArgs = decoded.inArguments[0]
  //   console.log('Get success on decode')
  //   // const result = response.body.items.find(
  //   //   (e) => e.keys.brand === decodedArgs.nPayload.brand
  //   // )

  //   //const token = result.values.token
  //   //const { journeyId, activityId } = decoded
  //   // decoded in arguments
  //   // const decodedOutArgs = decoded.outArguments[0]
  //   const {
  //     name,
  //     ContactID,
  //     nPayload,
  //     newPayload,
  //     phone,
  //   } = request.inArguments[0]
  //   //replace prop containt %name%
  //   let OCSID, contentName
  //   if (newPayload.OCSID) {
  //     OCSID = newPayload.OCSID
  //   }
  //   if (newPayload.contentName) {
  //     contentName = newPayload.contentName
  //   }
  //   // console.log('OCSID', OCSID)

  //   for (const prop in nPayload) {
  //     if (typeof nPayload[prop] === 'string') {
  //       for (let prop2 in newPayload) {
  //         if (nPayload[prop].includes(`%${prop2}%`))
  //           nPayload[prop] = nPayload[prop].replace(`%${prop2}%`, newPayload[prop2])
  //       }
  //     }
  //   }

  //   let { message, urlimg, brand } = nPayload

  //   //Add SendDate Field
  //   const time_options = {
  //     year: 'numeric', month: '2-digit', day: '2-digit',
  //     timeZone: 'America/Mexico_City'
  //   }
  //   const formatter = new Intl.DateTimeFormat('sv-SE', time_options)
  //   const sentdate = new Date();
  //   const sentdateCST = formatter.format(sentdate);

  //   // Log to DE 
  // const options = {
  //   Name: process.env.SENT_TABLE,
  //   props: {
  //     id: TelegramID + Date.now(),
  //     status: '',
  //     message: '',
  //     messageid: '',
  //     brand: `${brand}`,
  //   },
  // }
  //   let deRow = client.dataExtensionRow(options)
    
  //   deRow.post(function (err, response) {
  //     if(err){
  //       let error = JSON.stringify(err)
  //       console.log(deRow)
  //       console.log(error)

  //       if(error.message){
  //         console.log(error.code)
  //       }else{
  //       console.log('err.code: not exist')
  //       }
  //     }else{
  //       console.log('log to DE successfull')
  //     }
  //   })

  // res.status(200).send('Execute')
  // } else {
  //   console.error('inArguments invalid.')
  //   return res.status(400).end()
  // }})

  

  //  CALll APi TOKEN form TAblE ZToken
  // client.RestClient.get(`/data/v1/customobjectdata/key/${process.env.EXTERNAL_KEY}/rowset`)
  //   .then(function (response) {
  //     JWT(req.body, process.env.jwtSecret, (err, decoded) => {
  //       // verification error -> unauthorized request
  //       if (err) {
  //         console.error(err)
  //         return res.status(401).end()
  //       }

  //       if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
  //         // console.log(response)
  //         const decodedArgs = decoded.inArguments[0]

  //         const result = response.body.items.find(
  //           (e) => e.keys.brand === decodedArgs.nPayload.brand
  //         )

  //         const token = result.values.token
  //         const { journeyId, activityId } = decoded
  //         // decoded in arguments
  //         // const decodedOutArgs = decoded.outArguments[0]
  //         const {
  //           name,
  //           ContactID,
  //           Pdsid,
  //           Ensid,
  //           Grwid,
  //           Simid,
  //           Gluid,
  //           nPayload,
  //           newPayload,
  //           phone,
  //         } = decoded.inArguments[0]
  //         //replace prop containt %name%
  //         let OCSID, contentName
  //         if (newPayload.OCSID) {
  //           OCSID = newPayload.OCSID
  //         }
  //         if (newPayload.contentName) {
  //           contentName = newPayload.contentName
  //         }
  //         // console.log('OCSID', OCSID)

  //         for (const prop in nPayload) {
  //           if (typeof nPayload[prop] === 'string') {
  //             for (let prop2 in newPayload) {
  //               if (nPayload[prop].includes(`%${prop2}%`))
  //                 nPayload[prop] = nPayload[prop].replace(`%${prop2}%`, newPayload[prop2])
  //             }
  //           }
  //         }

  //         let { message, url, urlimg, title, brand, inputVals, messageType,sub2 } = nPayload

  //         //Add SendDate Field
  //         const time_options = {
  //           year: 'numeric', month: '2-digit', day: '2-digit',
  //           timeZone: 'America/Mexico_City'
  //         }
  //         const formatter = new Intl.DateTimeFormat('sv-SE', time_options)
  //         const sentdate = new Date();
  //         const sentdateCST = formatter.format(sentdate);

  //         if (inputVals) {
  //           inputVals.map((e, i) => {
  //             for (let prop in newPayload) {
  //               if (e.title.includes(`%${prop}%`)) {
  //                 e.title = e.title.replace(`%${prop}%`, newPayload[prop])
  //               }
  //               if (e.image_url.includes(`%${prop}%`)) {
  //                 e.image_url = e.image_url.replace(`%${prop}%`, newPayload[prop])
  //               }
  //               if (e.default_action.url.includes(`%${prop}%`)) {
  //                 e.default_action.url = e.default_action.url.replace(`%${prop}%`, newPayload[prop])
  //               }
  //             }
  //             if (e.default_action.type != 'oa.query.show') {
  //               e.default_action.url = `https://cloud.vn.abbottnutrition.com/${
  //                 process.env.CLOUD_PAGE || 'opentracking'
  //               }?id=${ContactID}&journeyid=${journeyId}&activityid=${activityId}&position=sub${
  //                 i + 1
  //               }&sentdate=${sentdateCST}&reurl=${e.default_action.url}`
  //             }
  //           })
  //         }

  //         url = `https://cloud.vn.abbottnutrition.com/${
  //           process.env.CLOUD_PAGE || 'opentracking'
  //         }?id=${ContactID}&journeyid=${journeyId}&activityid=${activityId}&position=main&sentdate=${sentdateCST}&reurl=${url}`
  //         let zaloId
  //         switch (brand) {
  //           case 'GRW':
  //             // code block
  //             zaloId = Grwid

  //             brand = 'Grow'
  //             break
  //           case 'PED':
  //             // code block
  //             zaloId = Pdsid
  //             brand = 'Pediasure'
  //             break
  //           case 'SIM':
  //             // code block
  //             zaloId = Simid
  //             brand = 'Similac'
  //             break
  //           case 'ENS':
  //             // code block
  //             zaloId = Ensid
  //             brand = 'Ensure'
  //             break
  //           case 'GLU':
  //             // code block
  //             zaloId = Gluid
  //             brand = 'Glucerna'
  //             break
  //           default:
  //             null
  //           // code block
  //         }
  //         try {
  //           ZaloRequest(
  //             token,
  //             zaloId,
  //             title,
  //             message,
  //             urlimg,
  //             url,
  //             journeyId,
  //             activityId,
  //             ContactID,
  //             brand,
  //             inputVals,
  //             OCSID,
  //             messageType,
  //             sub2,
  //             contentName
  //           )
  //         } catch (error) {
  //           console.log(error)
  //         }

  //         res.status(200).send('Execute')
  //       } else {
  //         console.error('inArguments invalid.')
  //         return res.status(400).end()
  //       }
  //     })
  //   })
  //   .catch((error) => {
  //     console.log('get token error', error.message)
  //   })
}

/** POST Handler for /publish/ route of Activity.*/
exports.publish = function (req, res) {
  logData(req);

  console.log("IN PUBLISH");
  
  const { journeyId, activityId } = req.body;
  console.log(req.body);
  // Simulate publishing process
  // Example: validate if activityId and journeyId are present and correct
  if (!journeyId || !activityId) {
    return res.status(400).send('Missing required fields.');
  }
  
  console.log("AFTER PUBLISHNG");
  // Additional logic to handle publishing, e.g., update database status, notify services, etc.
  
  res.status(200).send('Activity published successfully');
}


/** POST Handler for /validate/ route of Activity.*/
exports.validate = function (req, res) {
  logData(req);
  console.log("IN validate");
  console.log(req);

  const { inArguments } = req.body;

  console.log(req.body);
  // Example validation: Check if inArguments are provided
  if (!inArguments || !Array.isArray(inArguments) || inArguments.length === 0) {
    return res.status(400).send('Invalid inArguments.');
  }

  console.log("After validation");

  // Additional validation logic could go here (e.g., check for required fields, format validation)

  res.status(200).send('Validation successful');
}

/** POST Handler for / route of Activity (this is the edit route).*/
exports.edit = function (req, res) {
  console.log("WHILE EDITING");
  logData(req);
  
  const { journeyId, activityId, newDetails } = req.body;

  // Example: Validate input
  if (!journeyId || !activityId || !newDetails) {
    return res.status(400).send('Missing required fields for editing.');
  }

  // Example: Process and update the activity details
  // Here, `newDetails` would be the data sent for updating
  // You might update a database or an external service with newDetails
  
  // Simulate update logic
  // const updatedActivity = updateActivity(journeyId, activityId, newDetails);

  res.status(200).send('Activity updated successfully');
}


/** POST Handler for /save/ route of Activity.*/
exports.save = function (req, res) {

  Console.log("IN SAVING");
  logData(req);
  
  const { journeyId, activityId, currentDetails } = req.body;

  // Example: Validate input
  if (!journeyId || !activityId || !currentDetails) {
    return res.status(400).send('Missing required fields for saving.');
  }

  // Example: Save logic
  // Save currentDetails to a database or similar storage
  // const savedActivity = saveActivity(journeyId, activityId, currentDetails);

  res.status(200).send('Activity saved successfully');
}

