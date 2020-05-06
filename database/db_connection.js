const dbConObj = require('./db_con')
const connection = dbConObj.init()

const todoData = {
  getList: async function (list) {
    return new Promise((resolve) => {
      const sql = `SELECT * from ${list}`
      connection.query(sql, function (err, results, field) {
        const list = JSON.parse(JSON.stringify(results))
        for (let i = 0; i < list.length; i++) {
          list[i].date = list[i].date.split('T')[0]
        }
        resolve(list)
      })
    })
  },

}

module.exports = todoData