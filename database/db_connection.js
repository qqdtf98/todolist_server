const dbConObj = require('./db_con')
const connection = dbConObj.init()
const newCon = require('./db_custom')

const { Todo, Done } = require('../models')

const todoData = {
  getDataList: async function (data) {
    return new Promise((resolve) => {
      if (data.dbTable === 'todo_list') {
        Todo.findAll({
          where: {
            [`${data.bodyData.listType}Id`]: data.bodyData.userId,
          },
        }).then((res) => {
          const list = JSON.parse(JSON.stringify(res))
          for (let i = 0; i < list.length; i++) {
            list[i].date = list[i].date.split('T')[0]
          }
          resolve(list)
        })
      } else if (data.dbTable === 'done_list') {
        Done.findAll({
          where: {
            [`${data.bodyData.listType}Id`]: data.bodyData.userId,
          },
        }).then(function (res) {
          const list = JSON.parse(JSON.stringify(res))
          for (let i = 0; i < list.length; i++) {
            list[i].date = list[i].date.split('T')[0]
          }
          resolve(list)
        })
      }

      // const sql = `SELECT * from ${data.dbTable} where ${data.bodyData.listType}Id = ${data.bodyData.userId}`
      // connection.query(sql, function (err, results, field) {
      //   const list = JSON.parse(JSON.stringify(results))
      //   for (let i = 0; i < list.length; i++) {
      //     list[i].date = list[i].date.split('T')[0]
      //   }
      //   resolve(list)
      // })
    })
  },

  deleteList: async function (query) {
    return new Promise((resolve) => {
      let sql = `delete from ${query.table} where id = ${query.index}`
      connection.query(sql)
      sql = `select * from ${query.table} where ${query.type}Id = ${query.userId}`
      console.log(sql)
      connection.query(sql, function (err, results, field) {
        const list = JSON.parse(JSON.stringify(results))
        for (let i = 0; i < list.length; i++) {
          list[i].date = list[i].date.split('T')[0]
        }
        resolve(list)
      })
    })
  },

  addList: async function (bodyData) {
    return new Promise((resolve) => {
      let sql = `insert into todo_list (title,contents,date,state,importance,todoId) values ('${bodyData.newContext.title}','${bodyData.newContext.contents}','${bodyData.newContext.date}','${bodyData.newContext.state}','${bodyData.newContext.importance}',${bodyData.userId}) `
      connection.query(sql)
      sql = `select * from todo_list where todoId = ${bodyData.userId}`
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
      let sql = `update ${query.table} set ${query.key} = '${query.value}' where id=${query.index}`
      connection.query(sql)
      sql = `select * from ${query.table} where ${query.type}Id = ${query.userId}`
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
      if (query.type === 'todo') {
        sql = `insert into ${query.after}(id,title,contents,date,state,importance,todoId) values (${movedData.id},'${movedData.title}','${movedData.contents}','${dateStr}','${newState}','${movedData.importance}',${movedData.doneId})`
        await newCon.query(sql)
      } else if (query.type === 'done') {
        sql = `insert into ${query.after}(id,title,contents,date,state,importance,doneId) values (${movedData.id},'${movedData.title}','${movedData.contents}','${dateStr}','${newState}','${movedData.importance}',${movedData.todoId})`
        await newCon.query(sql)
      }

      console.log(sql)

      sql = `select * from todo_list where todoId = ${query.userId}`
      let results
      let todo_list
      results = await newCon.query(sql)
      todo_list = JSON.parse(JSON.stringify(results))
      for (let i = 0; i < todo_list.length; i++) {
        todo_list[i].date = todo_list[i].date.split('T')[0]
      }

      sql = `select * from done_list where doneId = ${query.userId}`
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
