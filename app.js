//https://www.youtube.com/watch?v=juPYfVY6jkQ&list=PLzb46hGUzitBp584kLyn6l3i6yC-rXlmN&index=5
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productRouter = require('./Routers/products')
const categoryRouter = require('./Routers/categorys')
const userRouter = require('./Routers/users')
const orderRouter = require('./Routers/order')
const cors = require('cors')
const authJWT = require('./Helper/jwt')
const errorHandler = require('./Helper/errorhandler')
require('dotenv/config')
const api = process.env.API_URL
const connection = process.env.MONGODB_CONNECTION

//middleware: check every reqest before it's 
app.use(express.json());
// app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.options('*',cors())
//check if user is authenticated or not before going into api
// app.use(authJWT())
app.use(errorHandler)
app.use('/public/uploads',express.static(__dirname + '/public/uploads'))
//routers
app.use(`${api}/products`,productRouter)
app.use(`${api}/categorys`,categoryRouter)
app.use(`${api}/users`,userRouter)
app.use(`${api}/order`,orderRouter)
mongoose.connect(connection)
.then(()=>{console.log('database connection is ready...')})
.catch((err)=>{console.log(err)})
// callback will be executed  when there's a successful creation of the server
app.listen(3000,()=>{
    console.log('server is runing on http://localhost:3000')
    console.log(api)
})

