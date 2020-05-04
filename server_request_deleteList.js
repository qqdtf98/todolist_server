const { doneList, todoList } = require('./server_request_getList')
const querystring = require('querystring')

function handleDelete(postdata) {
  const parsedQuery = querystring.parse(postdata)
  console.log(postdata)
  console.log(parsedQuery)
  if (parsedQuery.listType === 'todo') {
    console.log('ooioeoeoo')
    todoList.splice(parsedQuery.index, 1)
    console.log(todoList)
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    })
    response.end(JSON.stringify(todoList))
  } else if (parsedQuery.listType === 'done') {
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
