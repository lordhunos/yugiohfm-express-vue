const { ExtractJwt } = require('passport-jwt')

module.exports = {
    local: {
        session: false,
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, 

    jwt: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
        //passReqToCallback: true,
    },

    facebook: {
        passReqToCallback: true,
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName','emails', 'picture.type(large)'],
        enableProof: true
    }
}
