const {body,validationResult,matchedData}  = require('express-validator')
const {CATOGORY_SCHEMA,VALIDATIONS,getFormInputTag} = require('../dataConfig')
const {insertCategory,getAllCatogory} = require('../db/queries')
const upload  = require('./multerConfig')
const {getTodayDate} = require('../handlerFunctions')


const catogoryRows  = Object.keys(CATOGORY_SCHEMA)
async function getAllCatogories(req,res){
    const catogories =  await getAllCatogory()
    res.render('catogories',{catogories:catogories})
}

function getCatogoryCreateForm(req,res){
    res.render('newCatogory',{catogories:catogoryRows,getTag:getFormInputTag})
}

const catogoryValidations = catogoryRows.map(rows=>{
    return VALIDATIONS[rows]
}) 
async function handleCatogoryCreatePost(req,res){
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
        'image':req.file.filename,
        'discription':data.discription,
    })
    res.redirect('/catogory')
}


const catogoryCreatePost  = [upload.single('image'),catogoryValidations,handleCatogoryCreatePost]

module.exports = {
    getAllCatogories,
    getCatogoryCreateForm,
    catogoryCreatePost
}