
const {body,validationResult,matchedData}  = require('express-validator')


const items = []

function getAllItems(req,res){

    res.render('items',{items:items})
}

module.exports = {
    getAllItems,
}
