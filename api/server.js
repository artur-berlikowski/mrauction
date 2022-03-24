require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const port = 3001
const app = express()

//Routes
let user = require(path.resolve(__dirname + '/routes/user'))

//Session
app.use(session({
  secret: 'PuHfmzbyKRqPjWag(ZapZWw*qZFzJ4LS',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}))
//Allow Cross-Origin
app.use(cors())
//Set json content type headers
app.use('/', (request, response, next) => {
  response.header("Content-Type", "application/json")
  next()
})

//Enable JSON in body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Use routes
app.use('/user', user)

//Listen
app.listen(port, () => {
  console.log(`API Server Listening on Port ${port}`)
})