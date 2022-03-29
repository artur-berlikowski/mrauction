require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
//General
const port = 3001
const app = express()

//Routes
let user = require(path.resolve(__dirname + '/routes/user'))
let auth = require(path.resolve(__dirname + '/routes/auth'))
//Include the ability to parse header cookies
app.use(cookieParser())
//Allow Cross-Origin
app.use(cors())
//Enable JSON in body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Use routes
app.use('/user', user)
app.use('/auth', auth)
//Set headers
app.all('/*', (request, response, next) => {
  response.contentType('application/json');
  next();
})
//Start listening
app.listen(port, () => {
  console.log(`API Server Listening on Port ${port}`)
})