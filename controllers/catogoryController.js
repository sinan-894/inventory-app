const {body,validationResult,matchedData}  = require('express-validator')
const {CATOGORY_SCHEMA,getFormInputTag} = require('../dataConfig')

const catogories = []

function getAllCatogories(req,res){

    res.render('catogories',{catogories:catogories})
}

function getCatogoryCreateForm(req,res){
    const catogoryRows  = Object.keys(CATOGORY_SCHEMA)
    res.render('newCatogory',{catogories:catogoryRows,getTag:getFormInputTag})
}

function handleCatogoryCreatePost(req,res){
    const error = validationResult()
    if(!error.isEmpty()){
        console.log('error')
        console.log(error.array())
    }
    const data = matchedData()
    console.log(data)
}


module.exports = {
    getAllCatogories,
    getCatogoryCreateForm,
}