const { body, validationResult } = require('express-validator');
const UserModel = require('../models/User')

module.exports = {
    registerRules: () => {
        return [
            body('username').trim()
                .notEmpty().withMessage('Username can not be empty')
                .custom( async username => { return await UserModel.existsUsername(username) ? Promise.reject() : Promise.resolve() })
                    .withMessage('Given username already taken'),
    
            body('email').trim()
                .notEmpty().withMessage('Email can not be empty')
                .isEmail().withMessage('Invalid email')
                .custom( async email => { return await UserModel.existsEmail(email) ? Promise.reject() : Promise.resolve() })
                    .withMessage('Given email already taken'),
                
            body('password').trim()
                .isLength({ min: 8 }).withMessage('Password length must be al least 8')
                .custom( (password, { req }) => password === req.body.rpassword ).withMessage('Unmatched passwords')
        ]
    },

    loginRules: () => {
        return [
            body('username').trim()
                .notEmpty().withMessage('Username can not be empty')
                .custom( async username => { return await UserModel.existsUsername(username) ? Promise.resolve() : Promise.reject() })
                    .withMessage('Wrong username '),

            body('password').trim().notEmpty().withMessage('Password can not be empty')
        ]
    },
    
    validateData: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });       
        }
        next()
    }
}