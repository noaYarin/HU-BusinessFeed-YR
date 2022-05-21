const mongoose = require('mongoose'),
    Joi = require('joi'),
    uuid = require('uuid')

const cardSchema = mongoose.Schema(
    {
        ownerId: { type: mongoose.Schema.ObjectId, required: true },
        cardId: { type: String, required: true, unique: true },
        bName: { type: String, required: true },
        bDesc: { type: String, required: true },
        bAddr: { type: String, required: true },
        bPhone: { type: String, required: true },
        bImageUrl: { type: String, required: true },
        likes: { type: [mongoose.Schema.ObjectId] },
    },
    { timestamps: true }
)
cardSchema.methods.validateBusinessCard = bCard => {
    const joiCardSchema = Joi.object({
        ownerId: Joi.options({ allowUnknown: true }),
        cardId: Joi.string()
            .alphanum()
            .min(5)
            .max(30)
            .required(),
        bName: Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .required(),
        bDesc: Joi.string()
            .alphanum()
            .min(10)
            .max(50)
            .required(),
        bAddr: Joi.string()
            .alphanum()
            .min(6)
            .max(30)
            .required(),
        bPhone: Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .required(),
        bImageUrl: Joi.string()
            .alphanum()
            .min(2)
            .max(30)
            .required(),
    })
    return cardSchema.validate(bCard)
}

cardSchema.methods.generateCardId = () => {
    return uuid.v4().toString(5)
}


module.exports = mongoose.model('card', cardSchema)
// 10.4	על הכרטיס שיפתח לכלול את השדות הבאים:
//  שם העסק, bName
// 	תיאור העסק, bDesc
// 	כתובת העסק, = bAddr
// 	טלפון העסק, = bPhone
// 	תמונת העסק(קישור לתמונה), = bImageUrl
// 	מספר מזהה רנדומלי וייחודי = cardId  <string>
//  מועדפים = מערך של משתמשים שעשו לייק לכרטיס = likes
//  מזהה בעל הכרטיס = ownerId
