const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, default: '' },
    password: { type: String, default: null },
    provider: { type: String, default: 'local' }, 
    providerID: { type: String, delfaul: null },
    profilePic: { type: String, default: process.env.DEFAULT_PROFILE_PIC }
}, { timestamps: true })

UserSchema.statics.existsUsername = async function(username) {
    return await this.findOne({username}) !== null
}

UserSchema.statics.existsEmail= async function(email) {
    return await this.findOne({email}) !== null
}

UserSchema.statics.encryptPassword = async function(password) {
    return await bcrypt.hash(password, await bcrypt.genSalt(10))
}

UserSchema.statics.findOneCreateOrUpdate = async function(profile) {
    const { username, email, provider, providerID, profilePic } = profile
    
    let user = await this.findOne({ providerID })
    if(user) return user
    
    user = (email) ? await this.findOne({ email }) : await this.findOne({ username })
    if(user && user.provider === 'local'){
        user.provider = provider
        user.providerID = providerID
        user.profilePic = profilePic
        await user.save()
        return user
    }
    
    return await this.create({ username, email, provider, providerID, profilePic })
}

UserSchema.methods.comparePasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('user', UserSchema);