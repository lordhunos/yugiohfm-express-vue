const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    hash_password: String,
}, { timestamps: true });

mongoose.model('user', UserSchema);