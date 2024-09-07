// const { pool } = require('./databasepg')

// const options = {
//   journeyid: 'journeyId',
//   activityid: 'activityId',
//   zaloId: 'zaloId',
//   id: 'journeyId + activityId + zaloId + ContactID',
//   status: '',
//   message: '',
//   messageid: '',
//   contactid: 'ContactID',
//   brand: 'brand',
// }

// var journeyidValue = 'ahdgsjhdghajsgd'

// // pool.query(
// //   `INSERT INTO ZSent(journeyid, activityid, zaloid, status,messageid,message,brand,contactid)VALUES(
// //       ${options.journeyid}, ${options.zaloId}, ${options.status}, ${options.messageid},${options.message},${options.brand},${options.contactid})`,
// //   (err, res) => {
// //     console.log(err, res)
// //     pool.end()
// //   }
// // )

// let test = `INSERT INTO ZSent (journeyid, activityid, zaloid, status,messageid,message,brand,contactid)
// VALUES ( '${journeyidValue}', '3a33550a-523b-4173-be85-33cf023ed363', '49d584513afaeba7b2e8', 'success','','','','')`

// console.log('aaa', test)

// pool.query(test, (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
