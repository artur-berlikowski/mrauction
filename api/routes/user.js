const express = require('express')
const jwt = require('jsonwebtoken')
const dataManager = require('./../utility/DataManager')
const data = require('./../data')
const passwords = require('./../utility/passwords')
const router = express.Router()

router.route('/')
  .get(async (request, response) => {
    let result = await dataManager.query('SELECT name FROM user')
    response.json(result)
  })
  .post(async (request, response) => {
    const body = request.body
    let connection
    let lastInsertID
    let params = {
      name: body.name,
      hash: await passwords.encrypt(body.password),
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      country: body.country,
      county: body.county,
      city: body.city,
      address: body.address,
      postal_code: body.postal_code,
      phone_home: body.phone_home,
      phone_mobile: body.phone_mobile
    }
    console.log(params)
    try {
      connection = await data.connect()
      let result = await connection.query('INSERT INTO user (name) VALUES (?)', params.name)
      lastInsertID = result.insertId
      await connection.query('INSERT INTO user_secure (user_id,hash) VALUES (?,?)', [lastInsertID, params.hash])
      await connection.query('INSERT INTO user_credentials (user_id,email,first_name,last_name,country,county,city,address,postal_code,phone_home,phone_mobile) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [
        lastInsertID,
        params.email,
        params.first_name,
        params.last_name,
        params.country,
        params.county,
        params.city,
        params.address,
        params.postal_code,
        params.phone_home,
        params.phone_mobile
      ])
    } catch (error) {
      response.json({ "error": error.text })
      connection.end()
      return
    } finally {
      if (connection) connection.end()
    }
    response.json({
      "message": `user ${params.name} was created`
    })
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