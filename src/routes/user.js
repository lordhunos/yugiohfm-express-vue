const router = require('express').Router() 
const UserController = require('../controllers/user')
const { validateData, registerRules, loginRules } = require('../utils/validator')
const { ensureAuthorization } = require('../utils/middlewares')
const { sendSuccess } = require('../utils/middlewares')

router.post('/register',
    registerRules(),
    validateData,
    UserController.register,
    sendSuccess
)

router.get('/get', 
    ensureAuthorization,
    UserController.get, 
    sendSuccess
)

router.put('/update', 
    ensureAuthorization,
    UserController.update,
    sendSuccess
)

router.delete('/delete',
    ensureAuthorization,
    UserController.delete,
    sendSuccess
)

router.post('/login',
    loginRules(),
    validateData,
    UserController.login,
    sendSuccess
)

module.exports = router
