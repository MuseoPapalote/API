const Pool = require('pg').Pool;

const db = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: 5432,
    database: 'example',
})

module.exports = db;