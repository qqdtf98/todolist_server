const userData = require('../../database/db_user_connection')
const { getTodoDoneList } = require('../../server/server_request_getList')

function handleUserGet(response, parsedQuery) {
  userData.confirmUserAccount(parsedQuery).then((res) => {
    console.log(res)
    if (res.length === 0) {
      console.log('없음')
      // 회원가입
    } else {
      console.log('존재함')
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
      response.end(JSON.stringify(res))
    }
  })
}

module.exports = {
  handleUserGet,
}
