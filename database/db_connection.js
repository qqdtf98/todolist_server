const dbConObj = require('./db_con')
const connection = dbConObj.init()
const newCon = require('./db_custom')

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
    return new Promise(async (resolve) => {
      let sql = `select * from ${query.before} where id = ${query.id}`
      let movedData

      movedData = JSON.parse(JSON.stringify(await newCon.query(sql)))[0]

      sql = `delete from ${query.before} where id = ${query.id}`
      await newCon.query(sql)

      const date = new Date(movedData.date)
      const dateStr = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`
      let newState
      if (query.after === 'todo_list') {
        newState = 0
      } else if (query.after === 'done_list') {
        newState = 1
      }
      sql = `insert into ${query.after}(title,contents,date,state,importance) values ('${movedData.title}','${movedData.contents}','${dateStr}','${newState}','${movedData.importance}')`
      await newCon.query(sql)

      sql = `select * from todo_list`
      let results
      let todo_list
      results = await newCon.query(sql)
      todo_list = JSON.parse(JSON.stringify(results))
      for (let i = 0; i < todo_list.length; i++) {
        todo_list[i].date = todo_list[i].date.split('T')[0]
      }

      sql = `select * from done_list`
      let done_list
      results = await newCon.query(sql)
      done_list = JSON.parse(JSON.stringify(results))
      for (let i = 0; i < done_list.length; i++) {
        done_list[i].date = done_list[i].date.split('T')[0]
      }
      const newLists = {
        todo: todo_list,
        done: done_list,
      }
      resolve(newLists)
    })
  },
}

module.exports = todoData
