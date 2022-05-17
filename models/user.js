let mongoose = require('mongoose'),
    { Schema } = mongoose,
    Joi = require('joi'),
    crypto = require('crypto')

const userSchema = new Schema({
    userName: {
        type: String,
        required: 'Enter name',
    },
    email: {
        type: String,
        required: 'Enter email',
        unique: true,
    },
    password: {
        type: String,
        required: 'Enter password',
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
})

const User = mongoose.model('User', userSchema)
module.exports = User
