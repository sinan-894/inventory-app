// the item table will have id,catogoryId,created_on
//add to the ITEM_SCHEMA if you want additional rows
//to add new row enter name of the row as key and its html input type as key
const ITEM_SCHEMA = {
    'name':'text',
    'discription':'textarea',

}

const CATEGORY_SCHEMA = {
    'name':'text',
    'discription':'textarea'
}


const POSTGRES_DATA_TYPE = {
    'text':'VARCHAR(255)',
    'textarea':'TEXT',

}

const {body} = require('express-validator')
const VALIDATIONS = {
    'name': body('name').notEmpty().withMessage('name cant be empty')
            .trim().isLength({min:1,max:50}).withMessage('name shold be between 1 and 50 charachters'),
    'discription': body("discription").notEmpty().withMessage('discription cannot be empty')
}

//this object contains the the corresponding html tag for row of items 
//enter the starting and closing of the tag name and id will be inserted later
const FORM_INPUT_TAG = {
    'text':['<input type="text"',`value='`,`'>`],
    'textarea':['<textarea ','>','</textarea>'],
    'image':[`<input type='file' accept='image/*'`,`>`]


}


const getPostgresDataType = (type)=>{
    return POSTGRES_DATA_TYPE[type]
}

const getItemFormInputTag = (field)=>{
    return FORM_INPUT_TAG[ITEM_SCHEMA[field]].join(`name=${field} id=${field}`)
}

const getCategoryFormInputTag = (field,value)=>{
    console.log(value)
    value = (value)?value:''
    const tagTemplate =  FORM_INPUT_TAG[CATEGORY_SCHEMA[field]] 
    return `${tagTemplate[0]} name=${field} id=${field} ${tagTemplate[1]}${value}${tagTemplate[2]}`
}

module.exports={
    ITEM_SCHEMA,
    CATEGORY_SCHEMA,
    VALIDATIONS,
    getPostgresDataType,
    getItemFormInputTag,
    getCategoryFormInputTag,

}