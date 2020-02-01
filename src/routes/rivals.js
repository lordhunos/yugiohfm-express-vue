const express = require('express')
const router = express.Router()
const Rival = require('../models/Rival')

router.get('/rivals', async (req, res, next) => {
    let rivals = await Rival.find()
    res.send(rivals)
})

router.get('/rival/:id', async (req, res, next) => {
    let rival = await Rival.findById(req.params.id)
    res.send(rival)
})

module.exports = router