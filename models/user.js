let mongoose = require('mongoose'),
    { Schema } = mongoose,
    Joi = require('joi'),
    bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
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
        // {cards}
    },
    { timestamps: true }
)

userSchema.methods.validateUserFields = user => {
    const joiUserSchema = Joi.object({
        _id: Joi.options({ allowUnknown: true }),
        userName: Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .required(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        }),
        password: Joi.string()
            .required()
            .min(8)
            .max(20),
        isBusiness: Joi.boolean().default(false),
    })
    return joiUserSchema.validate(user)
}

userSchema.methods.hashUserPassword = psw => {
    const saltRounds = 5
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(psw, salt)
}


const User = mongoose.model('User', userSchema)
module.exports = User