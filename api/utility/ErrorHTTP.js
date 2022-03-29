const ErrorHTTP = (status) => {
  return { error: errors[status] }
}

const errors = {
  //HTTP Errors With Status Code 4xx
  401: { code: 401, message: "Unauthorized" }
}

module.exports = ErrorHTTP