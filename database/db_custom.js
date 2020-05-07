const dbConObj = require('./db_con')
const connection = dbConObj.init()

const newCon = {
  query: async function (sql) {
    return new Promise((resolve) => {
      connection.query(sql, function (err, results) {
        resolve(results)
      })
    })
  },
}

module.exports = newCon
