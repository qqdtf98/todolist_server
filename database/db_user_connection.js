const dbConObj = require('./db_con')
const connection = dbConObj.init()
const newCon = require('./db_custom')

const userData = {
  confirmUserAccount: async function (list) {
    return new Promise((resolve) => {
      console.log(list)
      const data = JSON.parse(list.userData)
      console.log(data)
      let sql = `select * from user_list where email = '${data.email}'`
      connection.query(sql, function (err, results, field) {
        resolve(results)
      })
    })
  },
}

module.exports = userData
