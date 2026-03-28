const {body,validationResult,matchedData}  = require('express-validator')


const catogories = []

function getAllCatogories(req,res){

    res.render('catogories',{catogories:catogories})
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
    getAllCatogories
}