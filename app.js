const express = require('express')
const path = require('path')
const {mainRouter} = require('./routes/mainRoute')
const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use('/',mainRouter)



app.listen(process.env.PORT||3000)