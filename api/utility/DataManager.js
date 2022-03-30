const { query } = require('express')
const mariadb = require('mariadb')
const pool = mariadb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  compress: process.env.DB_COMPRESS,
  connectTimeout: process.env.DB_TIMEOUT,
})

DataManager = {
  query: async (sql, args) => {
    let connection
    let result

    try {
      connection = await pool.getConnection()
      result = await connection.query(sql, args)
    } catch (error) {
      throw error
    } finally {
      if (connection) connection.end()
    }
    return result
  },
  querySingle: async (sql, args) => {
    let result = await DataManager.query(sql, args)
    return result[0]
  },
  getConnection: async () => {
    let connection = await pool.getConnection()
    return connection
  }
}

module.exports = DataManager