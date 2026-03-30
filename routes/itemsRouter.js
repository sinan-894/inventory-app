const {Router} = require('express')
const itemsRouter = Router()
const {displayAllItems,getItemCreateForm,itemsCreatePost} = require('../controllers/itemsController')



itemsRouter.get('/',displayAllItems)
itemsRouter.post('/',itemsCreatePost)
itemsRouter.get('/new',getItemCreateForm)

module.exports = {
    itemsRouter
}