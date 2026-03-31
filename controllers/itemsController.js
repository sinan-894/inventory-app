const {body,validationResult,matchedData}  = require('express-validator')
const {ITEM_SCHEMA,VALIDATIONS,getFormInputTag} = require('../dataConfig')
const {insertItems,getAllCategory,getAllItems,getIdOfCategory,getItem}  = require('../db/queries')
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
    )),topUrl:'/items'})
            
}

async function getItemCreateForm(req,res){
    let categoriesName = [{name:req.query.category,id:await getIdOfCategory(req.query.category)}]

    if(req.query.category==''){
        const categories = await getAllCategory()
        categoriesName = categories.map(category=>({id:category.id,name:category.name}))
    }
    console.log(categoriesName)
    res.render('newItem',{
        items:itemsRows,
        getTag:getFormInputTag,
        categories:categoriesName,
        category:req.query.category
    })

}


const itemsValidations = itemsRows.map(rows=>{
    return VALIDATIONS[rows]
}) 
async function handleitemsCreatePost(req,res){
    console.log(req)
    const category = req.query.category
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log('error')
        console.log(error.array())
    }
    const data = matchedData(req)
    console.log(data)
    await insertItems({
        'name':data.name,
        'categoryid':Number(req.body.category),
        'added_on':getTodayDate(),
        'discription':data.discription,
    })
    category==''?res.redirect('/items'):res.redirect(`/category/${category}`)
}

const itemsCreatePost  = [itemsValidations,handleitemsCreatePost]

async function displayItem(req,res) {
    const row = await getItem(req.params.item)
    res.render('item',{item:row[0],goBackTo:'/items'}) 

    
}

module.exports = {
    displayAllItems,
    getItemCreateForm,
    displayItem,
    itemsCreatePost
}
