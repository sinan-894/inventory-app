const {Router} = require('express')
const itemsRouter = Router()
const {getAllItems,getItemCreateForm} = require('../controllers/itemsController')



itemsRouter.get('/',getAllItems)
itemsRouter.get('/new',getItemCreateForm)

module.exports = {
    itemsRouter
}