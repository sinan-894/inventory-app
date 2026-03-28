
const {body,validationResult,matchedData}  = require('express-validator')
const {ITEM_SCHEMA,getFormInputTag} = require('./dataConfig')

const items = []

function getAllItems(req,res){

    res.render('items',{items:items})
}

function getItemCreateForm(req,res){
    const rows =  Object.keys(ITEM_SCHEMA)
    res.render('newItem',{items:rows,getTag:getFormInputTag})
}


module.exports = {
    getAllItems,
    getItemCreateForm,
}
