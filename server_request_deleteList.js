const { doneList, todoList } = require('./server_request_getList')
const querystring = require('querystring')

function handleDelete(response, parsedQuery) {
  if (parsedQuery.listType == 'todo') {
    todoList.splice(parsedQuery.index, 1)
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    })
    response.end(JSON.stringify(todoList))
  } else if (parsedQuery.listType == 'done') {
    doneList.splice(parsedQuery.index, 1)
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    })
    response.end(JSON.stringify(doneList))
  }
}

module.exports = {
  handleDelete,
}
