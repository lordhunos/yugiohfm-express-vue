require('dotenv').config()
const database = require('./database')

//Node modules
const path = require('path')
const morgan = require('morgan')
const express = require('express')

//Router files (to implement an index)
const actionRoutes = require('./routes/actions')
const cardRoutes = require('./routes/cards')
const rivalRoutes = require('./routes/rivals')

const app = express()

//Database
database()

//Config
app.set('port', process.env.APP_PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Server Routes
app.use('/api', [cardRoutes, rivalRoutes])
app.use('/auth', actionRoutes)

//Ficheros estaticos servidos a rutas relativas a /app 
app.use('/app', express.static(path.join(__dirname, 'public')))
//usados por Vue Client App
app.use('/app', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/app.html'))
})

//Server Start
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})