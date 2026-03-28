const {Router} = require('express')
const catogoriesRouter = Router()
const {getAllCatogories} = require('../controllers/catogoryController')



catogoriesRouter.get('/',getAllCatogories)

module.exports = {
    catogoriesRouter
}