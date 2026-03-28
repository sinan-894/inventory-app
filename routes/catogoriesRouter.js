const {Router} = require('express')
const catogoriesRouter = Router()
const {getAllCatogories,getCatogoryCreateForm,catogoryCreatePost} = require('../controllers/catogoryController')



catogoriesRouter.get('/',getAllCatogories)
catogoriesRouter.post('/',catogoryCreatePost)
catogoriesRouter.get('/new',getCatogoryCreateForm)

module.exports = {
    catogoriesRouter
}