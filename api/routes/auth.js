const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Utility = require('./../utility/Utility')
const DataManager = require('./../utility/DataManager')
const StatusHTTP = require('../utility/StatusHTTP')
const AuthenticateToken = require('./../middleware/AuthenticateToken')
const { json } = require('express')

router.route('/')
  .get((request, response) => {
    const token = request.cookies.access_token;
    if (!token) {
      return response.json({
        "data": {
          loggedIn: false
        }
      })
    }
    try {
      const data = jwt.verify(token, process.env.TOKEN_SECRET)
      return response.json({
        "data": {
          "loggedIn": true,
          "name": data.name
        }
      })
    } catch {
      return response.json({
        "data": {
          loggedIn: false
        }
      })
    }
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
            const token = jwt.sign({ id: userId, name: body.username }, process.env.TOKEN_SECRET)
            return response.cookie("access_token", token, {
              httpOnly: true,
              SameSite: true,
              secure: true
            })
              .status(200)
              .json({ "data": true })
          }
        }
        response.json(StatusHTTP(401))
        return
      } catch (error) {
        response.json(StatusHTTP(401))
        return
      }
    }
  })
  .delete((request, response) => {

  })

router.get('/logout', AuthenticateToken, (request, response) => {
  return response.clearCookie("access_token").status(200).json({ "data": "true" })
})

module.exports = router