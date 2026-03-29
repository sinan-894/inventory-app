const {body,validationResult,matchedData}  = require('express-validator')
const {ITEM_SCHEMA,VALIDATIONS,getFormInputTag} = require('../dataConfig')
const {insertItems,getAllCatogory}  = require('../db/queries')
const {getTodayDate} = require('../handlerFunctions')

const upload  = require('./multerConfig')
const { name } = require('ejs')
const items = []

const itemsRows =  Object.keys(ITEM_SCHEMA)
function getAllItems(req,res){

    res.render('items',{items:items})
}

async function getItemCreateForm(req,res){
    let catogoriesName = []
    if(req.query.catogory==''){
        const catogories = await getAllCatogory()
        catogoriesName = catogories.map(catogory=>({id:catogory.id,name:catogory.name}))
    }
    console.log(catogoriesName)
    res.render('newItem',{items:itemsRows,getTag:getFormInputTag,catogories:catogoriesName})

}


const itemsValidations = itemsRows.map(rows=>{
    return VALIDATIONS[rows]
}) 
async function handleitemsCreatePost(req,res){
    console.log(req.body)
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log('error')
        console.log(error.array())
    }
    const data = matchedData(req)
    console.log(req.file)
    console.log(data)
    await insertItems({
        'name':data.name,
        'catogoryid':Number(req.body.catogory),
        'added_on':getTodayDate(),
        'image':req.file.filename,
        'discription':data.discription,
    })
    res.send('done')
}

const itemsCreatePost  = [upload.single('image'),itemsValidations,handleitemsCreatePost]


module.exports = {
    getAllItems,
    getItemCreateForm,
    itemsCreatePost
}
