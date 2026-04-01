const {body,validationResult,matchedData}  = require('express-validator')
const {ITEM_SCHEMA,VALIDATIONS,getItemFormInputTag} = require('../dataConfig')
const {insertItems,getAllCategory,getAllItems,getIdOfCategory,getItem,deleteFromItems,getRowOfItem,getIdOfItem,updateItemOf}  = require('../db/queries')
const {getTodayDate} = require('../handlerFunctions')


const itemsRows =  Object.keys(ITEM_SCHEMA)
async function displayAllItems(req,res){
    const items = await getAllItems()
    console.log(items)
    res.render('items',{items:items.map(item=>(
        {
            name:item.name,
            category: item.category_name,
        }
    )),calledFrom:'items'})
            
}

async function getItemCreateForm(req,res){
    let categoriesName = [{name:req.query.category,id:await getIdOfCategory(req.query.category)}]

    if(req.query.category==''){
        const categories = await getAllCategory()
        categoriesName = categories.map(category=>({id:category.id,name:category.name}))
    }
    const send = {items:itemsRows,getTag:getItemFormInputTag,categories:categoriesName,category:req.query.category}
    console.log(categoriesName)
    !req.query.update?
    res.render('newItem',{
        ...send,
        action:`/items?category=${req.query.category}`,
        backUrl:`/items`
    }):
    res.render('newItem',{
        ...send,
        action:`/items?category=${req.query.category}&update=${req.query.update}`,
        backUrl:req.query.category==""?`/items`:`/category/${req.query.category}`,
        update: await getRowOfItem(req.query.update)
    })

}


const itemsValidations = itemsRows.map(rows=>{
    return VALIDATIONS[rows]
}) 
async function handleitemsCreatePost(req,res){
    const category = req.query.category
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log('error')
        console.log(error.array())
    }
    const data = matchedData(req)
    if(req.query.update){
        updateItem(category,req.query.update,data,res)
        return 0
    }
    console.log(data)
    await insertItems({
        'name':data.name,
        'categoryid':Number(req.body.category),
        'added_on':getTodayDate(),
        'discription':data.discription,
    })
    category==''?res.redirect('/items'):res.redirect(`/category/${category}`)
}

async function updateItem(category,item,data,res) {
    const id = await getIdOfItem(item)
    const values = Object.values(data)
    await updateItemOf(id,values)
    res.redirect(category==''?`/items/${data.name}`:`/category/${category}/${data.name}`)
    
}


const itemsCreatePost  = [itemsValidations,handleitemsCreatePost]

async function displayItem(req,res) {
    const row = await getItem(req.params.item)
    res.render('item',{item:row,goBackTo:'/items'}) 

    
}

async function deleteItems(req,res) {
    const itemName = req.query.item
    await deleteFromItems(itemName)
    res.redirect('/items')
}
module.exports = {
    displayAllItems,
    getItemCreateForm,
    displayItem,
    itemsCreatePost,
    deleteItems,
}
