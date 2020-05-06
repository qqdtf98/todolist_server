const todoData = require('../database/db_connection')

let todoList

function handleChange(response, parsedQuery) {
  // todoData.addList(JSON.parse(parsedQuery.newContext)).then((res) => {
  //   todoList = res
  //   response.writeHead(200, {
  //     'Content-Type': 'text/html; charset=utf-8',
  //     'Access-Control-Allow-Origin': '*',
  //   })
  //   response.end(JSON.stringify(todoList))
  // })

  // TODO chagne 구현하기
  todoData.changeList().then((res) => {
    const query = {
      before: parsedQuery.before,
      after: parsedQuery.after,
      index: parsedQuery.id,
    }
    todoData.changeList(query).then((res) => {
      console.log(res)
    })
  })
}

module.exports = {
  handleChange,
}
