const dbConObj = require('./db_con')
const connection = dbConObj.init()
const newCon = require('./db_custom')

const userData = {
  getUserAccount: async function (list) {
    return new Promise((resolve) => {
      const data = JSON.parse(list.userData)
      const sql = `select * from user_list where email = '${data.email}'`
      connection.query(sql, function (err, results, field) {
        resolve(results)
      })
    })
  },
  createUserAccount: async function (list) {
    return new Promise(async (resolve) => {
      const userData = JSON.parse(list.userData)
      let sql = `insert into user_list(googleId, email,name) values (${userData.googleId}, '${userData.email}','${userData.name}')`

      await connection.query(sql)
      sql = `select * from user_list where googleId =${userData.googleId}`
      connection.query(sql, function (err, results, field) {
        resolve(results)
      })
    })
  },
}

module.exports = userData
