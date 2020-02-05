const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const setValidations = () => {
    return [
        body('username', 'El nombre no puede estar vacío').notEmpty()
            .custom(async username =>  {
                return await User.findOne({ username }) === null ? Promise.resolve() : Promise.reject()
            }).withMessage('El usuario ya existe'),

        body('email', 'Email vacío o incorrecto').notEmpty().isEmail()
            .custom(async email =>  {
                return await User.findOne({ email }) === null ? Promise.resolve() : Promise.reject()
            }).withMessage('El correo ya existe'),

        body('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 })
            .custom((password, { req }) => password === req.body.password2)
            .withMessage('La contraseña no coincide')
    ]
}

const validate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });       
    }
    next()
}

router.post('/register', 
    setValidations(), 
    validate,
    async (req, res) => {
        const { username, email, password } = req.body
        const user = new User({username, email, password})
        //await user.save()
        const token = jwt.sign({_id: user._id}, process.env.APP_SECRET_KEY)
        res.status(200).json({
            action: 'User created',
            token 
        })
    }
)

module.exports = router
