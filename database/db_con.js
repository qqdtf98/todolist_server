const mysql = require('mysql')
const config = require('./db_info')

const dbConnection = {
  init: function () {
    return mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'nksmdk98',
      database: 'todolist',
    })
  },
  db_open: function (con) {
    con.connect(function (err) {
      if (err) {
        console.error('mysql connection error : ' + err)
      } else {
        console.info('mysql connection successfully.')
      }
      s
    })
  },
}

module.exports = dbConnection
