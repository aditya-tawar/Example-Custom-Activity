const { pool } = require('../datapg/databasepg')

exports.dbexcute = (options) => {
  pool.query(
    `INSERT INTO ZSent(journeyid, activityid, zaloid, status,messageid,message,brand,contactid)VALUES(
            '${options.journeyid}','${options.activityid}', '${options.zaloId}', '${options.status}', '${options.messageid}','${options.message}','${options.brand}','${options.contactid}')`,
    (err, res) => {
      if (err) {
        console.log('Import do DE fail', err)
      } else {
        console.log('Import do DE success row count =', res.rowCount)
      }
    }
  )
}
