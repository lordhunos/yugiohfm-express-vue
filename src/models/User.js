const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: String,
    password: { type: String, required: true },
    provider: { name: String, ID: String }
}, { timestamps: true, versionKey: false })

UserSchema.statics.existsUsername = async function(username) {
    return await this.findOne({username}) !== null
}

UserSchema.statics.existsEmail= async function(email) {
    return await this.findOne({email}) !== null
}

UserSchema.statics.encryptPassword = async function(password) {
    return await bcrypt.hash(password, await bcrypt.genSalt(10))
}

UserSchema.methods.comparePasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('user', UserSchema);