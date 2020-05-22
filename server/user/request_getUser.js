const userData = require('../../database/db_user_connection')
const { getTodoDoneList } = require('../../server/server_request_getList')

function getUserData(response, parsedQuery) {
  userData.getUserAccount(parsedQuery).then((res) => {
    if (res.length === 0) {
      // 회원가입
      userData.createUserAccount(parsedQuery).then((res) => {
        const list = {
          userData: JSON.stringify(res[0]),
        }
        userData.getUserAccount(list).then((res) => {
          response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          })
          response.end(JSON.stringify(res))
        })
      })
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      })
      response.end(JSON.stringify(res))
    }
  })
}

module.exports = {
  getUserData,
}
