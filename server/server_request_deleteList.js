const todoData = require('../database/db_connection')

function deleteTodoDoneList(response, bodyData) {
  if (bodyData.listType == 'todo') {
    const queryData = {
      type: 'todo_list',
      index: bodyData.index,
    }
    todoData.deleteList(queryData).then((res) => {
      const todoList = res
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
      response.end(JSON.stringify(todoList))
    })
  } else if (bodyData.listType == 'done') {
    const queryData = {
      type: 'done_list',
      index: bodyData.index,
    }
    todoData.deleteList(queryData).then((res) => {
      const doneList = res
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
      response.end(JSON.stringify(doneList))
    })
  }
}

module.exports = {
  deleteTodoDoneList,
}
