const mariadb = require('mariadb')
const config = require('./../config')
const pool = mariadb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  compress: process.env.DB_COMPRESS,
  connectTimeout: process.env.DB_TIMEOUT,
})
let connection;

async function connect() {
  if (!connection) {
    connection = await pool.getConnection()
  }
  return await connection
}

module.exports = { connect }