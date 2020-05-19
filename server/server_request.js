const { handleGet } = require('./server_request_getList')
const { handleDelete } = require('./server_request_deleteList')
const { handleAdd } = require('./server_request_addList')
const { handleUpdate } = require('./server_request_updateList')
const { handleChange } = require('./server_request_changeList')

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/list/get', function (req, res) {
  handleGet(res, req.body.data)
})

app.post('/list/delete', function (req, res) {
  handleDelete(res, req.body.data)
})

app.post('/list/add', function (req, res) {
  handleAdd(res, req.body.data)
})

app.post('/list/update', function (req, res) {
  handleUpdate(res, req.body.data)
})

app.post('/list/change', function (req, res) {
  handleChange(res, req.body.data)
})

app.get('/user/get', function (req, res) {
  handleUsetGet(res, req.query)
})

app.listen(80, function () {
  console.log('Server is running...')
})
