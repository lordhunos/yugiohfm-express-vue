const { ObjectId } = require("mongoose").Types
const express = require('express')
const router = express.Router()
const Card = require('../models/Card')


router.get('/cards', async (req, res, next) => {
    let cards = await Card.find()
    //res.send('<pre>'+cards+'</pre>')
    res.send(cards)
})

router.get('/card/:id', validateObjID, async (req, res, next) => {
    try{
        let card = await Card.findById(req.params.id)
        res.send(card)
    } catch(e) {
        throw new Error(e)
    }
})

function validateObjID(req, res, next) {
    if(!ObjectId.isValid(req.params.id)){
        res.sendStatus(404)
    }
    next()
}

module.exports = router