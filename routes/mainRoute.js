const {Router} = require('express')
const mainRouter = Router()
const {itemsRouter} = require('./itemsRouter')
const {catogoriesRouter} = require('./catogoriesRouter')

mainRouter.get('/',(req,res)=>{
    res.render('index')
})

mainRouter.use('/catogory',catogoriesRouter)
mainRouter.use('/items',itemsRouter)

module.exports = {
    mainRouter
}