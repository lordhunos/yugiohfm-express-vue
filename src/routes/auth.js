const router = require('express').Router()
const AuthController = require('../controllers/auth')

router.get('/facebook', 
    AuthController.facebook,
)

router.get('/facebook/callback', 
    AuthController.facebookCallback,
    (req, res) => {
        const { username, email, profilePic } = req.user
        res.status(200).json({ 
            message: 'Success',
            user: { usename, email, profilePic },
            token: req.token
        })
    }
)

module.exports = router