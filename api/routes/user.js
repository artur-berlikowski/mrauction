const express = require('express')
const jwt = require('jsonwebtoken')
const Utility = require('./../utility/Utility')
const DataManager = require('./../utility/DataManager')
const StatusHTTP = require('./../utility/StatusHTTP')
const AuthenticateToken = require('./../middleware/AuthenticateToken')
const data = require('./../data')
const router = express.Router()

router.route('/')
  .get(AuthenticateToken, async (request, response) => {
    let userId = request.userId
    let result = await DataManager.querySingle('SELECT name,email FROM user WHERE id=?', [userId])
    response.json(result)
  })
  .post(async (request, response) => {
    let { username, password, password_, email, email_, first_name, last_name, address, postal_code, phone_home, phone_mobile, continent, country, county, city, timezone } = request.body
    let connection;
    try {
      if (username && password && password_ && email && email_ && password === password_ && email === email_) {
        if (Utility.validateString(username, 6, 30, /^[A-Za-z0-9_]*$/)
          && Utility.validateStringLength(password, 8, 70)
          && Utility.validateEmail(email)) {
          password = await Utility.encryptPassword(password)
          connection = await DataManager.getConnection()
          await connection.beginTransaction()
          let { insertId } = await connection.query('INSERT INTO user (name,email) VALUES (?,?)', [username, email])
          await connection.query('INSERT INTO user_secure (user_id,hash) VALUES (?,?)', [insertId, password])
          await connection.query('INSERT INTO user_personal (user_id,first_name,last_name,country,county,city,address,postal_code,phone_home,phone_mobile,timezone) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [insertId, first_name, last_name, country, county, city, address, postal_code, phone_home, phone_mobile, timezone])
          await connection.commit()
          return response.status(201).json({ "data": StatusHTTP(201) })
        }
      }
    } catch (error) {
      if (connection) await connection.rollback()
      return response.status(409).json({ "error": StatusHTTP(409) })
    } finally {
      if (connection) await connection.end()
    }
    return response.status(409).json({ "error": StatusHTTP(409) })
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

router.route('/profile')
  .get(AuthenticateToken, async (request, response) => {
    let userId = request.userId
    let connection;
    try {
      connection = await DataManager.getConnection()
      await connection.beginTransaction()
      let userData = await connection.query('SELECT name,email FROM user WHERE id=?', userId)
      let userPersonalData = await connection.query('SELECT first_name,last_name,country,county,city,phone_mobile,timezone FROM user_personal WHERE user_id=?', userId)
      let result = {
        profile: { ...userData[0], ...userPersonalData[0] }
      }
      console.log(userData)
      await connection.commit()
      let data = {
        ...result,
        ...StatusHTTP(200)
      }
      return response.status(200).json({ "data": data })
    } catch (error) {
      console.log(error)
      if (connection) await connection.rollback()
      return response.status(404).json({ "error": StatusHTTP(404) })
    } finally {
      if (connection) await connection.end()
    }
  })
  .put()
  .post()
  .delete()

router.get('/profile/:name', async (request, response) => {
  let username = request.params.name
  try {
    let { id, name, email } = await DataManager.querySingle('SELECT id,name,email FROM user WHERE name=?', username)
    if (id && name && email) {
      let personal = { first_name, last_name, country, county, city, timezone } = await DataManager.querySingle('SELECT first_name,last_name,country,county,city,timezone FROM user_personal WHERE user_id=?', id)
      let data = { name, email, ...personal }
      return response.status(200).json({ "data": data })
    }
  } catch {
    return response.json({ "error": StatusHTTP(404) })
  }
  return response.json({ "error": StatusHTTP(404) })
})

module.exports = router