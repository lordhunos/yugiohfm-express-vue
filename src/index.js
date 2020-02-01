const database = require('./database')
const path = require('path')
const morgan = require('morgan')
const express = require('express')
const app = express()
const cardRoutes = require('./routes/cards');
const rivalRoutes = require('./routes/rivals');

//Database
database()


//Config
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api', [cardRoutes, rivalRoutes])

//Static
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})