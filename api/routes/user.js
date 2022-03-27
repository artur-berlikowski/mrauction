const express = require('express')
const jwt = require('jsonwebtoken')
const Utility = require('./../utility/Utility')
const DataManager = require('./../utility/DataManager')
const data = require('./../data')
const passwords = require('./../utility/passwords')
const router = express.Router()

router.route('/')
  .get(async (request, response) => {
    let result = await DataManager.query('SELECT name FROM user')
    response.json(result)
  })
  .post(async (request, response) => {
    let body = request.body
    let sql = ''
    let args = ''
    let result = ''
    let insertId = ''

    if (body.username && body.password && body.password_ && body.email && body.email_) {
      if (body.password === body.password_ && body.email === body.email_) {
        if (Utility.validateString(body.username, 6, 30, /^[A-za-z0-9_]*$/) &&
          Utility.validateStringLength(body.password, 6, 70) &&
          Utility.validateEmail(body.email)) {
          sql = 'INSERT INTO user (name,email) VALUES (?,?)'
          args = [body.username, body.email]
          result = await DataManager.query(sql, args)
          if (result.affectedRows === 1 && result.warningStatus === 0) {
            let passwordHash = await Utility.encryptPassword(body.password)
            insertId = result.insertId
            sql = 'INSERT INTO user_secure (user_id,hash) VALUES (?,?)'
            args = [insertId, passwordHash]
            result = await DataManager.query(sql, args)
            if (result.affectedRows === 1 && result.warningStatus === 0) {
              response.json({
                "data": {
                  "status": 201,
                  "message": `user with name ${body.username} was created`
                }
              })
              return
            }
          }
        }
      }
      response.json({ "data": `user with name ${body.username} could not be created` })
      return
    }
  })
  .put((request, response) => {

  })
  .delete(async (request, response) => {
    let body = request.body
    let params = {
      name: body.name
    }
    let connection;
    let id;
    try {
      connection = await data.connect()
      let result = await connection.query('SELECT id FROM user WHERE name=?', params.name)
      id = result[0].id
      if (id) {
        await connection.query('DELETE FROM user WHERE id=?', id)
        await connection.query('DELETE FROM user_secure WHERE user_id=?', id)
        await connection.query('DELETE FROM user_credentials WHERE user_id=?', id)
      }
    } catch (error) {
      if (error) {
        response.json({ "error": error.text })
        if (connection) connection.end()
        return
      }
    } finally {
      if (connection) connection.end()
      response.json({ "message": `user ${params.name} has been deleted` })
      return
    }
  })

router.route('/auth')
  .get(async (request, response) => {
    response.json({ "FUCK": "OFF" })
  })
  .post(async (request, response) => {
    let body = request.body
    let username = body.username
    let password = body.password
    let connection
    let result
    let userId
    let errors = false;

    try {
      connection = await data.connect()
    } catch (error) {
      errors = true

    } finally {
      if (errors !== false) {
        response.json({
          "auth": true
        })
        if (connection) connection.end()
        return
      }
    }
  })

module.exports = router