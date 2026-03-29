const {body,validationResult,matchedData}  = require('express-validator')
const {CATOGORY_SCHEMA,VALIDATIONS,getFormInputTag} = require('../dataConfig')
const {insertCategory} = require('../db/queries')
const upload  = require('./multerConfig')
const catogories = []

const catogoryRows  = Object.keys(CATOGORY_SCHEMA)
function getAllCatogories(req,res){

    res.render('catogories',{catogories:catogories})
}

function getCatogoryCreateForm(req,res){
    res.render('newCatogory',{catogories:catogoryRows,getTag:getFormInputTag})
}

const catogoryValidations = catogoryRows.map(rows=>{
    return VALIDATIONS[rows]
}) 
function handleCatogoryCreatePost(req,res){
    const error = validationResult(req) 
    if(!error.isEmpty()){
        console.log('error')
        console.log(error.array())
    }
    const data = matchedData(req)
    console.log(data)
    console.log(req.file)
    res.send('uploaded')
}

const catogoryCreatePost  = [upload.single('image'),catogoryValidations,handleCatogoryCreatePost]

module.exports = {
    getAllCatogories,
    getCatogoryCreateForm,
    catogoryCreatePost
}