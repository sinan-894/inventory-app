const {Router} = require('express')
const categoriesRouter = Router()
const {getAllCategories,getCategoryCreateForm,categoryCreatePost,displayItemsOfCategory,displayItem} = require('../controllers/categoryController')



categoriesRouter.get('/',getAllCategories)
categoriesRouter.post('/',categoryCreatePost)
categoriesRouter.get('/new',getCategoryCreateForm)
categoriesRouter.get('/:category',displayItemsOfCategory)
categoriesRouter.get('/:category/:item',displayItem)

module.exports = {
    categoriesRouter
}