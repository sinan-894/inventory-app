const {Router} = require('express')
const itemsRouter = Router()
const {displayAllItems,getItemCreateForm,itemsCreatePost,displayItem,deleteItems} = require('../controllers/itemsController')



itemsRouter.get('/',displayAllItems)
itemsRouter.post('/',itemsCreatePost)
itemsRouter.get('/new',getItemCreateForm)
itemsRouter.get('/delete',deleteItems)
itemsRouter.get('/:item',displayItem)

module.exports = {
    itemsRouter
}