const { ObjectId } = require("mongoose").Types

module.exports = {
    validateObjID: (req, res, next) =>  {
        if(!ObjectId.isValid(req.params.id)){
            res.sendStatus(404)
        }
        next()
    }
}