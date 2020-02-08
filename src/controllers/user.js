const passport = require('passport')
const UserModel = require('../models/User')

module.exports = {
    register:   passport.authenticate('new', { session: false }),
    get:        passport.authenticate('jwt-get', { session: false }),
    update:     passport.authenticate('jwt-update', { session: false }),
    delete:     passport.authenticate('jwt-delete', { session: false }),
    login:      passport.authenticate('login', { session: false })
}