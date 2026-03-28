const {Client} = require('pg')
const {getPostgresDataType,ITEM_SCHEMA,CATOGORY_SCHEMA} = require('../dataConfig')

const client = new Client({
    connectionString:`postgres://${process.env.ROLE_NAME}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`
})

const getSqlDefinition = (schema) =>{
    return Object.entries(schema).
        map(([row,type])=>`${row} ${getPostgresDataType(type)}`).
        join(',')
}
const itemsSqlDefinition = getSqlDefinition(ITEM_SCHEMA) 
const catogorySqlDefinition = getSqlDefinition(CATOGORY_SCHEMA)

const SQL = `
create table if not exists catogory (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_on date,
    ${catogorySqlDefinition}
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