const StatusHTTP = (code) => {
  return { http_status: status[code] }
}

const status = {
  //HTTP Status 2xx (Successful Request)
  201: { code: 201, message: "Created" },
  //HTTP Status 4xx (Client Error)
  401: { code: 401, message: "Unauthorized" },
  403: { code: 403, message: "Forbidden" },
  404: { code: 404, message: "The requested resource was not found" },
  409: { code: 409, message: "Conflict" }
}

module.exports = StatusHTTP