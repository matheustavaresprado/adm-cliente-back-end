const express = require('express')
const database = require('./src/database/connection')
const router = require('./src/routes/routes')
const cors = require('cors')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(router)

app.listen(4000, ()=>{
    console.log('Aplicação rodando em http://localhost:4000/')
})

app.get('/',(request,response)=>{
    response.send("Hello world")
 })