const mongoose = require('mongoose')

const dbConfig = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connection.on('connected', () => {
    console.log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
    console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
    console.log('Connection Lost')
})

mongoose.connection.on('close', () => {
    console.log('Connection Closed')
})

const dbConnect = async () => {
    try{
        await mongoose.connect('mongodb://localhost/ygofm_db', dbConfig)
    } catch (e) { 
        console.log('ERROR: ' + e)
    }
}

module.exports = dbConnect
