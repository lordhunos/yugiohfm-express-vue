const router = require('express').Router()
const Card = require('../models/Card')
const { validateObjID } = require('../utils/utils')


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

module.exports = router