const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const UserModel = require('../models/User')

const LocalOpts = {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
}

const JwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

passport.use('new', new LocalStrategy(LocalOpts,
    async (req, username, password, done) => {
        try{
            const hashedPassword = await UserModel.encryptPassword(password)
            const user = new UserModel({ username, password: hashedPassword })
            return done(null, user)
        }
        catch(e) {
            return done(e, null)
        }
    }
))

passport.use('login', new LocalStrategy(LocalOpts, 
    async (req, username, password, done) => {
        try{
            const user = await UserModel.findOne({username})
            if(! await user.comparePasswords(password)) return done(null, false, { warning: 'Wrong password'})
            return done(null, user)
        }
        catch(e) {
            return done(e, null)
        }
    }
)) 

passport.use('jwt', new JwtStrategy(JwtOpts,
    async (jwt_payload, done) => {
        try{
            //console.log('PAYLOAD:', jwt_payload)
            const user = await UserModel.findOne({ _id: jwt_payload._id })
            if(!user) done(null, false)
            done(null, user)
        }
        catch(e) {
            done(e)
        }
    }
))

module.exports = passport