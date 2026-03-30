const {body,validationResult,matchedData}  = require('express-validator')
const {ITEM_SCHEMA,VALIDATIONS,getFormInputTag} = require('../dataConfig')
const {insertItems,getAllCatogory,getAllItems,getIdOfCatogory,getItem}  = require('../db/queries')
const {getTodayDate} = require('../handlerFunctions')

const upload  = require('./multerConfig')

const itemsRows =  Object.keys(ITEM_SCHEMA)
async function displayAllItems(req,res){
    const items = await getAllItems()
    console.log(items)
    res.render('items',{items:items.map(item=>(
        {
            name:item.name,
            catogory: item.category_name,
        }
    )),topUrl:'/items'})
            
}

async function getItemCreateForm(req,res){
    let catogoriesName = [{name:req.query.catogory,id:await getIdOfCatogory(req.query.catogory)}]

    if(req.query.catogory==''){
        const catogories = await getAllCatogory()
        catogoriesName = catogories.map(catogory=>({id:catogory.id,name:catogory.name}))
    }
    console.log(catogoriesName)
    res.render('newItem',{
        items:itemsRows,
        getTag:getFormInputTag,
        catogories:catogoriesName,
        category:req.query.catogory
    })

}


const itemsValidations = itemsRows.map(rows=>{
    return VALIDATIONS[rows]
}) 
async function handleitemsCreatePost(req,res){
    console.log(req.body)
    const category = req.query.category
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
    category==''?res.redirect('/items'):res.redirect(`/catogory/${category}`)
}

const itemsCreatePost  = [upload.single('image'),itemsValidations,handleitemsCreatePost]

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
