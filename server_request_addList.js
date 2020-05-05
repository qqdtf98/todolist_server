const { doneList, todoList } = require('./server_request_getList')
const querystring = require('querystring')

function handleAdd(response, parsedQuery) {
  todoList.push(JSON.parse(parsedQuery.newContext))
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  })
  response.end(JSON.stringify(todoList))
}

module.exports = {
  handleAdd,
}
