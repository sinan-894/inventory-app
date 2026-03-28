const {Router} = require('express')
const itemsRouter = Router()
const {getAllItems} = require('../controllers/itemsController')



itemsRouter.get('/',getAllItems)

module.exports = {
    itemsRouter
}