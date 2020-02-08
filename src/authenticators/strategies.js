const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JwtStrategy} = require('passport-jwt')
const { Strategy: FbStrategy } = require('passport-facebook')
const opts = require('./options')
const UserModel = require('../models/User')
const { generateToken } = require('../utils/helpers')

passport.use('new', new LocalStrategy(opts.local,
    async (req, username, password, done) => {
        try{
            const hashedPassword = await UserModel.encryptPassword(password)
            const user = new UserModel({ 
                username, 
                email: req.body.email,
                password: hashedPassword 
            })
            await user.save()
            req.token = generateToken({ _id: user._id })
            done(null, user)
        }
        catch(e) {
            done(e, null)
        }
    }
))

passport.use('login', new LocalStrategy(opts.local, 
    async (req, username, password, done) => {
        try{
            const user = await UserModel.findOne({username})
            if(! await user.comparePasswords(password)) done(null, false, { warning: 'Wrong password'})
            req.token = generateToken({ _id: user._id })
            done(null, user)
        }
        catch(e) {
            done(e, null)
        }
    }
)) 

passport.use('jwt-get', new JwtStrategy(opts.jwt,
    async (jwt_payload, done) => {
        try{
            const user = await UserModel.findOne({ _id: jwt_payload._id })
            if(!user) done(null, false)
            done(null, user)
        }
        catch(e) {
            done(e)
        }
    }
))

passport.use('jwt-update', new JwtStrategy(opts.jwt,
    async (jwt_payload, done) => {
        try{
            const user = await UserModel.findOne({ _id: jwt_payload._id })
            if(!user) done(null, false)
            
            const { username, email, profilePic } = req.body
            user.username = username
            user.email = email
            user.profilePic = (profilePic === '') ? process.env.DEFAULT_PROFILE_PIC : profilePic
            await user.save()
            done(null, user)
        }
        catch(e) {
            done(e)
        }
    }
))

passport.use('jwt-delete', new JwtStrategy(opts.jwt,
    async (jwt_payload, done) => {
        try{
            const query = { _id: jwt_payload._id }
            const user = await UserModel.findOne(query)
            if(!user) done(null, false)
            await UserModel.deleteOne(query)
            done(null, user)
        }
        catch(e) {
            done(e)
        }
    }
))

passport.use('facebook', new FbStrategy(opts.facebook,
    async (req, accessToken, refreshToken, profile, done) => {
        const userData = {
            username: profile.displayName,
            email: profile.emails[0].value,
            provider: profile.provider,
            providerID: profile.id,
            profilePic: profile.photos[0].value
        }   
        const user = await UserModel.findOneCreateOrUpdate(userData)
        req.token = generateToken({ _id: user._id })
        done(null, user)
    }    
))

module.exports = passport