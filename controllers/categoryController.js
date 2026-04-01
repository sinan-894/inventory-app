const {body,validationResult,matchedData}  = require('express-validator')
const {CATEGORY_SCHEMA,VALIDATIONS,getCategoryFormInputTag} = require('../dataConfig')
const {insertCategory,getAllCategory,getItemsOf,getItem,deleteFromCategory,updateCategoryOf,getRowOfCategory, getIdOfCategory} = require('../db/queries')
const {getTodayDate} = require('../handlerFunctions')


const categoryRows  = Object.keys(CATEGORY_SCHEMA)
async function getAllCategories(req,res){
    const categories =  await getAllCategory()
    console.log('categories',categories)
    res.render('categories',{categories:categories})
}

async function getCategoryCreateForm(req,res){
    console.log(req.query.update)
    !req.query.update?
    res.render('newCategory',{
        categories:categoryRows,
        getTag:getCategoryFormInputTag,
        action:"/category",
        backUrl:'/category'
    }):
    res.render('newCategory',{
        categories:categoryRows,
        getTag:getCategoryFormInputTag,
        action:`/category?update=${req.query.update}`,
        backUrl:`/category/${req.query.update}`,
        update:await getRowOfCategory(req.query.update),
    })
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
    if(req.query.update){
        updateCategory(req.query.update,data,res)
        return 0
    }

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
    })),category:req.params.category,calledFrom:req.params.category})
    
}


const categoryCreatePost  = [categoryValidations,handleCategoryCreatePost]


async function displayItem(req,res) {
    console.log(req.params)
    const row = await getItem(req.params.item)
    console.log(row)
    const category = req.params.category
    res.render('item',{item:row,goBackTo:`/category/${category}`}) 

    
}

async function deleteCategory(req,res) {
    const categoryName = req.query.category
    await deleteFromCategory(categoryName)
    res.redirect('/category')
}

async function updateCategory(category,data,res) {
    const id = await getIdOfCategory(category)
    const values = Object.values(data)
    await updateCategoryOf(id,values)
    res.redirect(`/category/${data.name}`)
    
}
module.exports = {
    getAllCategories,
    getCategoryCreateForm,
    categoryCreatePost,
    displayItemsOfCategory,
    displayItem,
    deleteCategory,
}