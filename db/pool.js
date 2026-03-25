const {Pool} = require('pg')

const pool = new Pool({
    connectionString:`postgres://${process.env.ROLE_NAME}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`
})

module.exports = pool