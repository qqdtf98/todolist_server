const { doneList, todoList } = require('./server_request_getList')
const querystring = require('querystring')

function handleUpdate(response, parsedQuery) {
  if (parsedQuery.listType == 'todo') {
    const updateElem = todoList.splice(parsedQuery.index, 1)[0]
    updateElem[parsedQuery.key] = parsedQuery.value
    todoList.splice(parsedQuery.index, 0, updateElem)
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    })
    response.end(JSON.stringify(todoList))
  } else if (parsedQuery.listType == 'done') {
    const updateElem = doneList.splice(parsedQuery.index, 1)[0]
    updateElem[parsedQuery.key] = parsedQuery.value
    doneList.splice(parsedQuery.index, 0, updateElem)
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    })
    response.end(JSON.stringify(doneList))
  }
}

module.exports = {
  handleUpdate,
}
