const {Router} = require('express')
const mainRouter = Router()
const {getAllCatogories} = require('../controllers/catogoryController')
const {getAllItems} = require('../controllers/itemsController')


mainRouter.get('/',(req,res)=>{
    res.render('index')
})

mainRouter.get('/catogory',getAllCatogories)
mainRouter.get('/items',getAllItems)

module.exports = {
    mainRouter
}