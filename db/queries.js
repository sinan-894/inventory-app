const pool = require('./pool')
const {ITEM_SCHEMA} = require('../dataConfig')

async function insertItems(items){
    const sql = Object.keys(ITEM_SCHEMA).join(',')
    const values = items.join(',')
    await pool.query('insert into items ($1) values ($2);',[sql,values])

}

async function getAllItems() {
    const {rows} = await pool.query('select * from items;')
    return rows
}

