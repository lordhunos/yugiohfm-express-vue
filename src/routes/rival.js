const router = require('express').Router()
const Card = require('../models/Rival')
const { validateObjID } = require('../utils/middlewares')

router.get('/rivals', async (req, res, next) => {
    let rivals = await Rival.find()
    res.send(rivals)
})

router.get('/rival/:id', validateObjID, async (req, res, next) => {
    let rival = await Rival.findById(req.params.id)
    res.send(rival)
})

module.exports = router