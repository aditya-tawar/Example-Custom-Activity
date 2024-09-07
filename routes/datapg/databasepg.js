const { Pool, Client } = require('pg')

const pgclient = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true },
  },
})

exports.pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true },
  },
})

// pgclient
//   .connect()
//   .then(() => {
//     pgclient.query('Select * from ZSent', (err, res) => {
//       if (!err) {
//         console.log('query row', res.rows[0])
//       } else {
//         console.log(err.message)
//       }
//     })
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// const addtext = `ALTER TABLE zsent
//   ADD "eventdate" TIMESTAMP default current_timestamp;`

// const droptable = `ALTER TABLE zsent
// DROP COLUMN "eventdate";`

// const text = `
//     CREATE TABLE IF NOT EXISTS ZSent (

// 	    "id" SERIAL,
//         "journeyid" VARCHAR(1300) ,
//         "activityid" VARCHAR(1300) ,
//         "zaloid" VARCHAR(50) ,
//         "status" VARCHAR(50) ,
//         "messageid" VARCHAR(50) ,
//         "message" VARCHAR(4000) ,
//         "brand" VARCHAR(50) ,
//         "contactid" VARCHAR(50),

// 	    PRIMARY KEY ("id")
//     );`

// pgclient.query(addtext).then((result) => {
//   if (result) {
//     console.log('Table created')
//   }
// })

// const deleteUser = async (userName) => {
//   try {
//       await pgclient.connect();  // gets connection
//       await pgclient.query('DELETE FROM "users" WHERE "name" = $1', [userName]); // sends queries
//       return true;
//   } catch (error) {
//       console.error(error.stack);
//       return false;
//   } finally {
//       await pgclient.end();  // closes connection
//   }
// };

// deleteUser('Denis').then((result) => {
//   if (result) {
//       console.log('User deleted');
//   }
// });
