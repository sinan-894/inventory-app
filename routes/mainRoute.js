const {Router} = require('express')
const mainRouter = Router()
const {itemsRouter} = require('./itemsRouter')
const {categoriesRouter} = require('./categoriesRouter')

mainRouter.get('/',(req,res)=>{
    res.render('index')
})

mainRouter.use('/category',categoriesRouter)
mainRouter.use('/items',itemsRouter)

module.exports = {
    mainRouter
}