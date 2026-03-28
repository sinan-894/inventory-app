const {Router} = require('express')
const itemsRouter = Router()
const {getAllItems,getItemCreateForm,itemsCreatePost} = require('../controllers/itemsController')



itemsRouter.get('/',getAllItems)
itemsRouter.post('/',itemsCreatePost)
itemsRouter.get('/new',getItemCreateForm)

module.exports = {
    itemsRouter
}