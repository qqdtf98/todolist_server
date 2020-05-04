const { handleGet } = require('./server_request_getList')
const { handleDelete } = require('./server_request_deleteList')

const http = require('http')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url)
  const resource = parsedUrl.pathname
  const parsedQuery = querystring.parse(parsedUrl.query, '&', '=')

  if (resource == '/list/delete') {
    let postdata = ''
    request.on('data', function (data) {
      console.log(data)
      postdata = postdata + data
    })

    request.on('end', function () {
      console.log(postdata + 'eeee')
      handleDelete(postdata)
    })
  } else if (resource == '/list/get') {
    handleGet(response, parsedQuery)
  }
})

server.listen(80, function () {
  console.log('Server is running...')
})
