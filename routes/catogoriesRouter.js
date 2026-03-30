const {Router} = require('express')
const catogoriesRouter = Router()
const {getAllCatogories,getCatogoryCreateForm,catogoryCreatePost,displayItemsOfCatogory} = require('../controllers/catogoryController')



catogoriesRouter.get('/',getAllCatogories)
catogoriesRouter.post('/',catogoryCreatePost)
catogoriesRouter.get('/:category',displayItemsOfCatogory)
catogoriesRouter.get('/new',getCatogoryCreateForm)

module.exports = {
    catogoriesRouter
}