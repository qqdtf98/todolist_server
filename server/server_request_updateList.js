const { doneList, todoList } = require('./server_request_getList')
const querystring = require('querystring')
const todoData = require('../database/db_connection')

function handleUpdate(response, bodyData) {
  let query
  if (bodyData.listType == 'todo') {
    query = {
      type: 'todo_list',
      key: bodyData.key,
      value: bodyData.value,
      index: bodyData.index,
    }
    todoData.updateList(query).then((res) => {
      let todoList = res
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
      response.end(JSON.stringify(todoList))
    })
  } else if (bodyData.listType == 'done') {
    query = {
      type: 'done_list',
      key: bodyData.key,
      value: bodyData.value,
      index: bodyData.index,
    }
    todoData.updateList(query).then((res) => {
      let doneList = res
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
      response.end(JSON.stringify(doneList))
    })
  }
}

module.exports = {
  handleUpdate,
}
