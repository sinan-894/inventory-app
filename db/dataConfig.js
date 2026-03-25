// the item table will have id,catogoryId,created_on
//add to the ITEM_SCHEMA if you want additional rows
//to add new row enter name of the row as key and its html input type as key
const ITEM_SCHEMA = {
    'name':'text',
    'image':'text',
    'discription':'textarea',

}


const POSTGRES_DATA_TYPE = {
    'text':'VARCHAR(255)',
    'textarea':'TEXT',

}


const getPostgresDataType = (type)=>{
    return POSTGRES_DATA_TYPE[type]
}


module.exports={
    ITEM_SCHEMA,
    getPostgresDataType
}