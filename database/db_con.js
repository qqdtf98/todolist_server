const mysql = require('mysql')
const config = require('./db_info')

const dbConnection = {
  init: function () {
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'nksmdk98',
      database: 'todolist',
    })

    return connection
  },
  db_open: function (conn) {
    conn.connect(function (err) {
      if (err) {
        console.error('mysql connection error : ' + err)
      } else {
        console.info('mysql connection successfully.')
      }
    })
  },
}

module.exports = dbConnection
