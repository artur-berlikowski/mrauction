const jwt = require('jsonwebtoken')
const ErrorHTTP = require('./../utility/ErrorHTTP')

function authenticateToken(request, response, next) {
  const token = request.cookies.access_token;
  if (!token) {
    return response.status(403).json(ErrorHTTP(403))
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET)
    request.userId = data.id
    request.username = data.name
    return next()
  } catch {
    return response.status(403).json(ErrorHTTP(403))
  }
  next()
}

module.exports = authenticateToken