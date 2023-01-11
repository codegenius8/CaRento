require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const db = require("./db")
const cors = require("cors")
const  carRoutes  = require('./router/Cars')
const userRoutes = require("./router/User")
const HttpError = require('./utills/HttpErrors')
app.use(express.json())
app.use(cors())
app.use("/api/cars",carRoutes)
app.use("/api/user",userRoutes)

app.use((error,req,res,next)=>{
  const errorStatus = error.status || 500
  const errorMessage  = error.message || "Something went wrong!"
  return res.status(errorStatus).send({
    success : false,
    status : errorStatus,
    message : errorMessage,
    stack : error.stack
  }) 
  

})
// root
app.get('/',(req,res)=>{
    res.send("hello world 2")
})

app.listen(port,()=> console.log(`node server running on port port ${port}`))
