const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    hash_password: String,
}, { timestamps: true });

UserSchema.methods.existsUsername = function(cb) {
    return 'hello'
}

UserSchema.methods.existsEmail= function(cb) {
    return cb
}

module.exports = mongoose.model('user', UserSchema);