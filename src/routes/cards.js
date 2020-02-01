const express = require('express')
const router = express.Router()
const Card = require('../models/Card')

router.get('/cards', async (req, res, next) => {
    let cards = await Card.find()
    //res.send('<pre>'+cards+'</pre>')
    res.send(cards)
})

router.get('/card/:id', async (req, res, next) => {
    let card = await Card.findById(req.params.id)
    res.send(card)
})

module.exports = router