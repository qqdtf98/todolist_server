const todoData = require('../database/db_connection')

let todoList
let doneList

function getTodoDoneList(response, bodyData) {
  if (bodyData.listType == 'todo') {
    const newData = {
      dbTable: 'todo_list',
      bodyData,
    }
    todoData.getDataList(newData).then((res) => {
      todoList = res
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
      response.end(JSON.stringify(todoList))
    })
  } else if (bodyData.listType == 'done') {
    const newData = {
      dbTable: 'done_list',
      bodyData,
    }
    todoData.getDataList(newData).then((res) => {
      doneList = res
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
      response.end(JSON.stringify(doneList))
    })
  }
}

module.exports = {
  todoList,
  doneList,
  getTodoDoneList,
}
