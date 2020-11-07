const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
require('dotenv').config({path: "./config/.env"})

const app = express();

// middleware
app.use(express.json())
app.use(cookieParser())

connectDB()

// auth router
app.use('/auth', require('./router/auth'))

// 404 Router
app.use(async(req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
}) 

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server started at: ${PORT}`));