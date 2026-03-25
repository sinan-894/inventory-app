const {Client} = require('pg')
const {getPostgresDataType,ITEM_SCHEMA} = require('../dataConfig')

const client = new Client({
    connectionString:`postgres://${process.env.ROLE_NAME}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`
})

const itemsSqlDefinition = Object.entries(ITEM_SCHEMA).
    map(([row,type])=>`${row} ${getPostgresDataType(type)}`).
    join(',')

const SQL = `
create table if not exists catogory (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    created_on date,
    discription VARCHAR(255)
);


create table if not exists items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    catogoryId Integer,
    added_on date,
    ${itemsSqlDefinition}
);


`
async function main() {
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log('done')
}

main()