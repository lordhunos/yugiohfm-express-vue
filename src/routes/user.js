const router = require('express').Router() 
const UserController = require('../controllers/user')

router.post('/register',
    UserController.registerData(),
    UserController.validate,
    UserController.create,
    (req, res) => {
        res.status(200).json({ message: 'User created', user: req.user })
    }
)

router.get('/get', UserController.get, (req, res) => { res.status(200).json({ message: 'success', user: req.data }) })

router.put('/update')

router.delete('/delete')

router.post('/login',
    UserController.loginData(),
    UserController.validate,
    UserController.login,
    (req, res) => {
        res.status(200).json({
            message: 'Success',
            token: req.token
        })
    }
)

module.exports = router
