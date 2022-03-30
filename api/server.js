require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
//General
const port = 3001
const app = express()

app.use((req, res, next) => {
  next()
})

//Routes
let user = require(path.resolve(__dirname + '/routes/user'))
let auth = require(path.resolve(__dirname + '/routes/auth'))
//Include the ability to parse header cookies
app.use(cookieParser())
//Allow Cross-Origin
let allowedOrigins = ['http://localhost:3000', 'localhost']
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    } return callback(null, true);
  }
}))
//Enable JSON in body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Use routes
app.use('/user', user)
app.use('/auth', auth)
//Start listening
app.listen(port, () => {
  console.log(`API Server Listening on Port ${port}`)
})