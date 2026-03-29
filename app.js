const express = require('express')
const path = require('path')
const {mainRouter} = require('./routes/mainRoute')
const app = express()
const assetPath = path.join(__dirname,'public')

app.use(express.static(assetPath))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use('/',mainRouter)



app.listen(process.env.PORT||3000)