
const {body,validationResult,matchedData}  = require('express-validator')
const {ITEM_SCHEMA,VALIDATIONS,getFormInputTag} = require('../dataConfig')

const upload  = require('./multerConfig')
const items = []

const itemsRows =  Object.keys(ITEM_SCHEMA)
function getAllItems(req,res){

    res.render('items',{items:items})
}

function getItemCreateForm(req,res){
    res.render('newItem',{items:itemsRows,getTag:getFormInputTag})
}


const itemsValidations = itemsRows.map(rows=>{
    return VALIDATIONS[rows]
}) 
function handleitemsCreatePost(req,res){
    console.log(req)
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log('error')
        console.log(error.array())
    }
    const data = matchedData(req)
    console.log(data)
}

const itemsCreatePost  = [upload.single('image'),itemsValidations,handleitemsCreatePost]


module.exports = {
    getAllItems,
    getItemCreateForm,
    itemsCreatePost
}
