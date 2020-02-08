const passport = require('passport')
const { generateToken } = require('../utils/helpers')

module.exports = {
    facebook: 
        passport.authenticate('facebook', { 
            authType: 'rerequest', 
            scope: ['email'] 
        }),

    facebookCallback:
        passport.authenticate('facebook', { session: false }),
        

}