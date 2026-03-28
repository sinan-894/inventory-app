const express = require('express')
const path = require('path')
const {ITEM_SCHEMA,getFormInputTag} = require('./dataConfig')
const {mainRouter} = require('./routes/mainRoute')
const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use('/',mainRouter)
app.get('/newItem',(req,res)=>{
    const rows =  Object.keys(ITEM_SCHEMA)
    res.render('newItem',{items:rows,getTag:getFormInputTag})
})


app.listen(process.env.PORT||3000)