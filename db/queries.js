const pool = require('./pool')
const {genratePlaceHolder} = require('../handlerFunctions')

async function insertItems(items){
    const rows = Object.keys(items).join(',')
    console.log(rows)
    const values = Object.values(items)
    console.log(values)
    const sql = `insert into items (${rows}) values (${genratePlaceHolder(values.length)});`
    console.log(sql)
    await pool.query(sql,values)

}

async function insertCategory(items) {
    const rows = Object.keys(items).join(',')
    console.log(rows)
    const values = Object.values(items)
    console.log(values)
    const sql = `insert into catogory (${rows}) values (${genratePlaceHolder(values.length)});`
    console.log(sql)
    await pool.query(sql,values)
}

async function getAllItems() {
    const {rows} = await pool.query(`
        SELECT items.*,catogory.name as category_name from items LEFT JOIN catogory
        ON items.catogoryid=catogory.id; 
    `)
    return rows
}

async function getAllCatogory() {
    const { rows } = await pool.query('select * from catogory;')
    return rows
}

async function getCategoryFromId(id) {
    const {rows} = await pool.query('select name from catogory where id=$1;',[id])
    return rows[0].name
    
}

async function getItemsOf(catogory) {
    const {rows} = await pool.query(`
        SELECT  * from items LEFT JOIN catogory
        ON items.catogoryid=catogory.id 
        WHERE catogory.name=$1;`,
        [catogory]) 
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
    getCategoryFromId,

}