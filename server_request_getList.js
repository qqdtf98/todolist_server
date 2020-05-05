const http = require('http')
const url = require('url')
const querystring = require('querystring')

const todoList = [
  {
    title: 'title',
    contents: 'contents1',
    date: '2020/4/29',
    state: false,
    importance: 'red',
  },
  {
    title: 'title',
    contents: 'contents2',
    date: '2020/4/29',
    state: false,
    importance: 'green',
  },
  {
    title: 'title',
    contents: 'contents3',
    date: '2020/4/29',
    state: false,
    importance: 'red',
  },
  {
    title: 'title',
    contents: 'contents4',
    date: '2020/4/29',
    state: false,
    importance: 'yellow',
  },
]

const doneList = [
  {
    title: 'title',
    contents: 'done1',
    date: '2020/4/29',
    state: true,
    importance: 'red',
  },
  {
    title: 'title',
    contents: 'done2',
    date: '2020/4/29',
    state: true,
    importance: 'yellow',
  },
]

function handleGet(response, parsedQuery) {
  if (parsedQuery.listType == 'todo') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    })
    response.end(JSON.stringify(todoList))
  } else if (parsedQuery.listType == 'done') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    })
    response.end(JSON.stringify(doneList))
  }
}

module.exports = {
  todoList,
  doneList,
  handleGet,
}
