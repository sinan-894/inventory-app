const pool = require('./pool')
const {genratePlaceHolder,genrateUpdatePlaceHolder} = require('../handlerFunctions')
const {ITEM_SCHEMA,CATEGORY_SCHEMA} = require('../dataConfig')

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
    const sql = `insert into category (${rows}) values (${genratePlaceHolder(values.length)});`
    console.log(sql)
    await pool.query(sql,values)
}

async function getAllItems() {
    const {rows} = await pool.query(`
        SELECT items.*,category.name as category_name from items LEFT JOIN category
        ON items.categoryid=category.id; 
    `)
    return rows
}

async function getAllCategory() {
    const { rows } = await pool.query('select * from category;')
    return rows
}

async function getRowOfCategory(category) {
    console.log(category)
    const {rows} = await pool.query('select * from category where name=$1',[category])
    console.log('row category',rows)
    return rows[0]
    
}
async function getIdOfCategory(categoryName) {
    const {rows} = await pool.query('select id from category where name=$1;',[categoryName])
    console.log(rows)
    return rows.length?rows[0].id:0
    
}

async function getItemsOf(category) {
    const {rows} = await pool.query(`
        SELECT  items.* from items LEFT JOIN category
        ON items.categoryid=category.id 
        WHERE category.name=$1;`,
        [category]) 
    return rows
    
}

async function getItem(itemName) {
        
    const {rows} = await pool.query(`
        SELECT * from items
        WHERE name=$1
    `,[itemName])
    return rows
}

async function deleteFromCategory(name){
    await pool.query('delete from category where name=$1',[name])
}

async function deleteFromItems(name) {
    await pool.query('delete from items where name=$1',[name])
    
}

async function updateCategoryOf(id,values) {
    const sql = `
        UPDATE category
        SET ${genrateUpdatePlaceHolder(CATEGORY_SCHEMA,values.length)}
        WHERE id=${id};
    `
    console.log(sql)
    await pool.query(sql,values)
    
}
module.exports = {
    getAllCategory,
    getAllItems,
    getItem,
    getItemsOf,
    insertItems,
    insertCategory,
    getIdOfCategory,
    deleteFromCategory,
    deleteFromItems,
    updateCategoryOf,
    getRowOfCategory,

}