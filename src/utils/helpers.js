const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: payload => {
        return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 300 })
    }
}