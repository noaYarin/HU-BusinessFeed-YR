const mongoose = require("mongoose"),
	{ Schema } = mongoose,
	Joi = require("joi")

const cardSchema = new Schema(
	{
		ownerId: { type: Schema.Types.ObjectId, required: true },
		cardId: { type: String, required: true, unique: true },
		bName: { type: String, required: true },
		bDesc: { type: String, required: true },
		bAddr: { type: String, required: true },
		bPhone: { type: String, required: true },
		bImageUrl: { type: String, required: true },
		likes: { type: [], default: [] },
	},
	{ timestamps: true }
)
cardSchema.methods.validateBusinessCard = (bCard) => {
	const joiCardSchema = Joi.object({
		_id: Joi.options({ allowUnknown: true }),
		ownerId: Joi.options({ allowUnknown: true }),
		likes: Joi.options({ allowUnknown: true }),
		bName: Joi.string()
			.min(2)
			.max(30)
			.required(),
		bDesc: Joi.string()
			.min(10)
			.max(50)
			.required(),
		bAddr: Joi.string()
			.min(6)
			.max(30)
			.required(),
		bPhone: Joi.string()
			.min(2)
			.max(30)
			.required(),
		bImageUrl: Joi.string()
			.min(10)
			.required(),
		cardId: Joi.string(),
	})
	return joiCardSchema.validate(bCard)
}

// cardSchema.methods.genCardId = (card) => {
// 	card.cardId = uniqueCardId()
// 	// return uniqueCardId()
// } genCardId = uniqueCardId()
const Card =  mongoose.model("Card", cardSchema)
module.exports = Card
// 10.4	על הכרטיס שיפתח לכלול את השדות הבאים:
//  שם העסק, bName
// 	תיאור העסק, bDesc
// 	כתובת העסק, = bAddr
// 	טלפון העסק, = bPhone
// 	תמונת העסק(קישור לתמונה), = bImageUrl
// 	מספר מזהה רנדומלי וייחודי = cardId  <string>
//  מועדפים = מערך של משתמשים שעשו לייק לכרטיס = likes
//  מזהה בעל הכרטיס = ownerId
