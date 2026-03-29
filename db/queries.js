const pool = require('./pool')

async function insertItems(items){
    const rows = Object.keys(items).join(',')
    const values = Object.values(items).join(',') 
    await pool.query('insert into items ($1) values ($2);',[rows,values])

}

async function insertCategory(items) {
    const rows = Object.keys(items).join(',')
    const values = Object.values(items).join(',') 
    await pool.query('insert into catogory ($1) values ($2);',[rows,values])
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