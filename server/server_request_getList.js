const http = require('http')
const url = require('url')
const querystring = require('querystring')
const todoData = require('../database/db_connection')

let todoList
let doneList

function handleGet(response, parsedQuery) {
  if (parsedQuery.listType == 'todo') {
    todoData.getList('todo_list').then((res) => {
      todoList = res
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
      response.end(JSON.stringify(todoList))
    })
  } else if (parsedQuery.listType == 'done') {
    todoData.getList('done_list').then((res) => {
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
  handleGet,
}