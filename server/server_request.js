// const { handleGet } = require('./server_request_getList')
// const { handleDelete } = require('./server_request_deleteList')
// const { handleAdd } = require('./server_request_addList')
// const { handleUpdate } = require('./server_request_updateList')
// const { handleChange } = require('./server_request_changeList')

// const http = require('http')
// const url = require('url')
// const querystring = require('querystring')

// const server = http.createServer(function (request, response) {
//   const parsedUrl = url.parse(request.url)
//   const resource = parsedUrl.pathname
//   const parsedQuery = querystring.parse(parsedUrl.query, '&', '=')
//   let body = []

//   if (resource == '/list/delete') {
//     handleDelete(response, parsedQuery)
//   } else if (resource == '/list/get') {
//     handleGet(response, parsedQuery)
//   } else if (resource == '/list/add') {
//     handleAdd(response, parsedQuery)
//   } else if (resource == '/list/update') {
//     handleUpdate(response, parsedQuery)
//   } else if (resource == '/list/change') {
//     handleChange(response, parsedQuery)
//   }
// })

// server.listen(80, function () {
//   console.log('Server is running...')
// })

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/user/get', function (req, res) {
  console.log(req.body)
  res.json({
    what: 'hello',
  })
})

app.listen(80, function () {
  console.log('Server is running...')
})
