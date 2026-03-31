const {Client} = require('pg')
const {getPostgresDataType,ITEM_SCHEMA,CATEGORY_SCHEMA} = require('../dataConfig')
const {getTodayDate} = require('../handlerFunctions')
const client = new Client({
    connectionString:`postgres://${process.env.ROLE_NAME}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`
})

const getSqlDefinition = (schema) =>{
    return Object.entries(schema).
        map(([row,type])=>`${row} ${getPostgresDataType(type)}`).
        join(',')
}
const itemsSqlDefinition = getSqlDefinition(ITEM_SCHEMA) 
const categorySqlDefinition = getSqlDefinition(CATEGORY_SCHEMA)

const SQL = `
create table if not exists category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_on date,
    ${categorySqlDefinition}
);


create table if not exists items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryId Integer,
    added_on date,
    ${itemsSqlDefinition}
);

insert into category (name,discription,created_on)
values ('public','items that does not belong to any particular category','${getTodayDate()}');

`
async function main() {
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log('done')
}

main()