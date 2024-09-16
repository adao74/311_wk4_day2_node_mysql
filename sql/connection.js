const mysql = require('mysql2')
require('dotenv').config()

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: process.env.HOST, // see database in cloud
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE 
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;