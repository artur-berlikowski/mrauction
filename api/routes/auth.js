const express = require('express')
const router = express.Router()
const Utility = require('./../utility/Utility')
const DataManager = require('./../utility/DataManager')
const ErrorHTTP = require('./../utility/ErrorHTTP')

router.route('/')
  .get((request, response) => {

  })
  .put((request, response) => {

  })
  .post(async (request, response) => {
    let body = request.body
    if ((body.email && body.email !== '' || body.username && body.username !== '') && body.password && body.password !== '') {
      try {
        let sql = 'SELECT id FROM user WHERE ' + (body.email ? 'email' : 'name') + '=?'
        let args = [body.username ? body.username : body.email]
        let result = await DataManager.querySingle(sql, args)
        if (result.id) {
          let userId = result.id
          sql = 'SELECT hash FROM user_secure WHERE user_id=?'
          args = [userId]
          result = await DataManager.querySingle(sql, args)
          if (result.hash && await Utility.comparePassword(body.password, result.hash)) {
            sql = 'INSERT INTO session (user_id,token,expires) VALUES (?,?,?)'
            args = [userId,]
            response.json({ "data": true })
            return
          }
        }
        response.json(ErrorHTTP(401))
        return
      } catch (error) {
        response.json(ErrorHTTP(401))
        return
      }
    }
  })
  .delete((request, response) => {

  })

module.exports = router