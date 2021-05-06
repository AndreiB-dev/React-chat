const { Pool } = require('pg');
const pool = new Pool({
    user: 'admin',
    host: '127.0.0.1',
    database:'chatdb',
    password: '123',
    port: 5432,
});
module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    },
  }
