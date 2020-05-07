const todoData = require('../database/db_connection')

let todoList

function handleChange(response, parsedQuery) {
  todoData.changeList(parsedQuery).then((res) => {
    const newList = {
      todo: res.todo,
      done: res.done,
    }
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    })
    response.end(JSON.stringify(newList))
  })
}

module.exports = {
  handleChange,
}
