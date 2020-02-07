//Load environment
require('dotenv').config()
//Set database
const database = require('./database')
//Node modules
const path = require('path')
const morgan = require('morgan')
const express = require('express')
const passport = require('passport')
//Router files (to implement an index)
const userRoutes = require('./routes/user')
const cardRoutes = require('./routes/card')
const rivalRoutes = require('./routes/rival')

const app = express()

//Start database
database()

//Config
require('./utils/auth')
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

//Server Routes
app.use('/api', [cardRoutes, rivalRoutes])
app.use('/user', userRoutes)

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