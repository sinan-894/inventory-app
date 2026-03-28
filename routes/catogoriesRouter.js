const {Router} = require('express')
const catogoriesRouter = Router()
const {getAllCatogories,getCatogoryCreateForm} = require('../controllers/catogoryController')



catogoriesRouter.get('/',getAllCatogories)
catogoriesRouter.get('/new',getCatogoryCreateForm)

module.exports = {
    catogoriesRouter
}