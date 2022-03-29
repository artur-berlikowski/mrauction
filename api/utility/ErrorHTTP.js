const ErrorHTTP = (status) => {
  return { error: errors[status] }
}

const errors = {
  //HTTP Errors With Status Code 4xx
  401: { code: 401, message: "Unauthorized" },
  403: { code: 403, message: "Forbidden" }
}

module.exports = ErrorHTTP