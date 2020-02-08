const { ObjectId } = require("mongoose").Types

module.exports = {
    validateObjID: (req, res, next) =>  {
        if(ObjectId.isValid(req.params.id)) next()
        res.sendStatus(404)        
    },

    ensureAuthorization: (req, res, next) => {
        if(req.headers.authorization) next()
        else res.status(401).json({ message: 'Request must provide a valid Token' })
    },

    sendSuccess: (req, res) => {
        const { username, email, profilePic } = req.user
        const resData = { 
            message: 'Success', 
            user: { username, email, profilePic },    
        }
        if(req.token) resData.token = req.token
        res.status(200).json(resData)
    }
}

