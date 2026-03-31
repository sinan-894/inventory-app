const {body,validationResult,matchedData}  = require('express-validator')
const {CATEGORY_SCHEMA,VALIDATIONS,getFormInputTag} = require('../dataConfig')
const {insertCategory,getAllCategory,getItemsOf,getItem} = require('../db/queries')
const {getTodayDate} = require('../handlerFunctions')


const categoryRows  = Object.keys(CATEGORY_SCHEMA)
async function getAllCategories(req,res){
    const categories =  await getAllCategory()
    console.log('categories',categories)
    res.render('categories',{categories:categories})
}

function getCategoryCreateForm(req,res){
    res.render('newCategory',{categories:categoryRows,getTag:getFormInputTag})
}

const categoryValidations = categoryRows.map(rows=>{
    return VALIDATIONS[rows]
}) 
async function handleCategoryCreatePost(req,res){
    const error = validationResult(req) 
    if(!error.isEmpty()){
        console.log('error')
        console.log(error.array())
    }
    const data = matchedData(req)
    console.log(data)
    console.log(req.file)
    await insertCategory({
        'created_on':getTodayDate(),
        'name':data.name,
        'discription':data.discription,
    })
    res.redirect('/category')
}

async function displayItemsOfCategory(req,res) {
    const rows = await getItemsOf(req.params.category)
    res.render('items',{items:rows.map(row=>({
        name:row.name,
    })),category:req.params.category,topUrl:`/category/${req.params.category}`})
    
}


const categoryCreatePost  = [categoryValidations,handleCategoryCreatePost]


async function displayItem(req,res) {
    console.log(req.params)
    const row = await getItem(req.params.item)
    const category = req.params.category
    res.render('item',{item:row[0],goBackTo:`/category/${category}`}) 

    
}

module.exports = {
    getAllCategories,
    getCategoryCreateForm,
    categoryCreatePost,
    displayItemsOfCategory,
    displayItem
}