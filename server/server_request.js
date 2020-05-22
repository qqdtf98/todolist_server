const { getTodoDoneList } = require('./server_request_getList')
const { deleteTodoDoneList } = require('./server_request_deleteList')
const { addTodoDoneList } = require('./server_request_addList')
const { updateTodoDoneList } = require('./server_request_updateList')
const { moveTodoDoneList } = require('./server_request_changeList')
const { getUserData } = require('./user/request_getUser')

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/list/get', function (req, res) {
  getTodoDoneList(res, req.body.data)
})

app.post('/list/delete', function (req, res) {
  deleteTodoDoneList(res, req.body.data)
})

app.post('/list/add', function (req, res) {
  addTodoDoneList(res, req.body.data)
})

app.post('/list/update', function (req, res) {
  updateTodoDoneList(res, req.body.data)
})

app.post('/list/change', function (req, res) {
  moveTodoDoneList(res, req.body.data)
})

app.get('/user/get', function (req, res) {
  getUserData(res, req.query)
})

app.listen(80, function () {
  console.log('Server is running...')
})
