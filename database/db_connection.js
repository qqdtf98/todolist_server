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

  deleteList: async function (query) {
    return new Promise((resolve) => {
      let sql = `delete from ${query.type} where id = ${query.index}`
      connection.query(sql)
      sql = `select * from ${query.type}`
      connection.query(sql, function (err, results, field) {
        const list = JSON.parse(JSON.stringify(results))
        for (let i = 0; i < list.length; i++) {
          list[i].date = list[i].date.split('T')[0]
        }
        resolve(list)
      })
    })
  },

  addList: async function (newContext) {
    return new Promise((resolve) => {
      let sql = `insert into todo_list (title,contents,date,state,importance) values ('${newContext.title}','${newContext.contents}','${newContext.date}','${newContext.state}','${newContext.importance}')`
      connection.query(sql)
      sql = `select * from todo_list`
      connection.query(sql, function (err, results, field) {
        const list = JSON.parse(JSON.stringify(results))
        for (let i = 0; i < list.length; i++) {
          list[i].date = list[i].date.split('T')[0]
        }
        resolve(list)
      })
    })
  },

  updateList: async function (query) {
    return new Promise((resolve) => {
      let sql = `update ${query.type} set ${query.key} = '${query.value}' where id=${query.index}`
      connection.query(sql)
      sql = `select * from ${query.type}`
      connection.query(sql, function (err, results, field) {
        const list = JSON.parse(JSON.stringify(results))
        for (let i = 0; i < list.length; i++) {
          list[i].date = list[i].date.split('T')[0]
        }
        resolve(list)
      })
    })
  },

  changeList: async function (query) {
    return new Promise((resolve) => {
      let sql = `select * from ${query.before} where id = ${query.index}`
      let movedData
      connection.query(sql, function (err, results) {
        movedData = results
      })
      sql = `delete from ${query.before} where id = ${query.index}`
      connection.query(sql)
      sql = `insert into ${query.after} (title,contents,date,state,importance) values ('${movedData.title}','${movedData.contents}','${movedData.date}','${movedData.state}','${movedData.importance}')`
      connection.query(sql)
      sql = `select * from todo_list`
      let todo_list
      connection.query(sql, function (err, results, field) {
        const list = JSON.parse(JSON.stringify(results))
        for (let i = 0; i < list.length; i++) {
          list[i].date = list[i].date.split('T')[0]
        }
        todo_list = list
      })
      sql = `select * from done_list`
      let done_list
      connection.query(sql, function (err, results, field) {
        const list = JSON.parse(JSON.stringify(results))
        for (let i = 0; i < list.length; i++) {
          list[i].date = list[i].date.split('T')[0]
        }
        done_list = list
      })
      const newLists = {
        todo: todo_list,
        done: done_list,
      }
      resolve(newLists)
    })
  },
}

module.exports = todoData
