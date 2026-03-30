const {Router} = require('express')
const itemsRouter = Router()
const {displayAllItems,getItemCreateForm,itemsCreatePost,displayItem} = require('../controllers/itemsController')



itemsRouter.get('/',displayAllItems)
itemsRouter.post('/',itemsCreatePost)
itemsRouter.get('/:item',displayItem)
itemsRouter.get('/new',getItemCreateForm)

module.exports = {
    itemsRouter
}