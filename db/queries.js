const pool = require('./pool')
const {ITEM_SCHEMA,CATOGORY_SCHEMA} = require('../dataConfig')

async function insertItems(items){
    const sql = Object.keys(ITEM_SCHEMA).join(',')
    const values = items.join(',')
    await pool.query('insert into items ($1) values ($2);',[sql,values])

}

async function insertCategory(items) {
    const sql = Object.keys(CATOGORY_SCHEMA).join(',')
    const values = items.join(',') 
    await pool.query('insert into items ($1) values ($2);',[sql,values])
}

async function getAllItems() {
    const {rows} = await pool.query('select * from items;')
    return rows
}

async function getAllCatogory() {
    const { rows } = await pool.query('select * from catogory;')
    return rows
}


async function getItemsOf(catogory) {
    const {rows} = await pool.query(`
        SELECT  * from items LEFT JOIN catogory
        ON items.catogoryid=catogory.id 
        WHERE catogory.name=$1;`,[catogory]) 
    return rows
    
}

async function getItem(itemName) {
        
    const {rows} = await pool.query(`
        SELECT * from items
        WHERE name=$1
    `,[itemName])
    return rows
}


module.exports = {
    getAllCatogory,
    getAllItems,
    getItem,
    getItemsOf,
    insertItems,
    insertCategory,

}