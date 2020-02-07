const UserModel = require('../models/User')
const passport = require('passport')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')



module.exports = {
    create: (req, res, next) => {
        passport.authenticate('new', async (error, user, info) => {
            if(error) res.status(500).json({ error })
            if(info) res.status(422).json({ info })
            if(user){
                if(req.body.email) user.email = req.body.email
                await user.save()
                next() 
            }
        })(req, res, next)
    },

    get: (req, res, next) => {
        if(req.headers['authorization']){    
            passport.authenticate('jwt', { session: false }, (error, user, info) => {
                if(error) res.status(500).json({ error })
                if(info) res.status(403).json({info})
                if(user) {
                    req.data = user
                    next()
                } 
            })(req, res, next)
        }
        else{
            res.status(401).json({ error: 'Unauthorized' })
        }
    },

    login: (req, res, next) => {
        passport.authenticate('login', (error, user, info) => {
            if(error) res.status(500).json({ error })
            if(info) res.status(422).json({ info })
            if(user){
                const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: 300 })
                req.token = token
                next()
            }
        })(req, res, next)
    },

    registerData: () => {
        return [
            body('username')
                .notEmpty().withMessage('Username can not be empty')
                .custom( async username => { return await UserModel.existsUsername(username) ? Promise.reject() : Promise.resolve() })
                    .withMessage('Given username already taken'),
    
            body('email').optional()
                .isEmail().withMessage('Invalid email')
                .custom( async email => { return await UserModel.existsEmail(email) ? Promise.reject() : Promise.resolve() })
                    .withMessage('Given email already taken'),
                
            body('password')
                .isLength({ min: 8 }).withMessage('Password length must be al least 8')
                .custom( (password, { req }) => password === req.body.password2 ).withMessage('Unmatched passwords')
        ]
    },
    loginData: () => {
        return [
            body('username')
                .notEmpty().withMessage('Username can not be empty')
                .custom( async username => { return await UserModel.existsUsername(username) ? Promise.resolve() : Promise.reject() })
                    .withMessage('Wrong username ')
        ]
    },
    validate: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });       
        }
        next()
    }
}