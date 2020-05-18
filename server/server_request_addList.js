const todoData = require('../database/db_connection')

let todoList

function handleAdd(response, parsedQuery) {
  todoData.addList(parsedQuery.newContext).then((res) => {
    todoList = res
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    })
    response.end(JSON.stringify(todoList))
  })
}

module.exports = {
  handleAdd,
}
