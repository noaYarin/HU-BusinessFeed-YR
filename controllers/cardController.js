const Card = require("../models/card"),
	_ = require("lodash")
const castObjectId = require('mongoose').Types.ObjectId


const getAllCards = () => {
	return new Promise((resolve, reject) => {
		Card.find({})
			.then((cards) => resolve(cards))
			.catch((err) => reject(err))
	})
}
const getUserCards = (userId) => {
	return new Promise((resolve, reject) => {
		Card.find({ ownerId: userId })
			.then((cards) => resolve(cards))
			.catch((err) => reject(err))
	})
}
const insertOneCard = (cardData) => {
	return new Promise((resolve, reject) => {
		const card = new Card(cardData)
		let { error } = card.validateBusinessCard(card._doc)
		if (error) {
			let err = error.details[ 0 ].message
			reject(err)
		}
		card.save()
			.then((card) => resolve(card))
			.catch((err) => reject(err))
	})
}
const getOneCard = (cardId) => {
	return new Promise((resolve, reject) => {
		Card.findOne({
			$or: [
				{ cardId },
				{ _id: castObjectId.isValid(cardId) ? cardId : null }
			]
		})
			.then((card) => {
				card ? resolve(card) : reject("No Card Found!")
			})
			.catch((err) => reject(err))
	})
}
const updateCard = (cardId, cardData) => {
	return new Promise((resolve, reject) => {
		Card.findByIdAndUpdate(cardId, cardData)
			.then((card) => resolve(card))
			.catch((err) => reject(err))
	})
}
const addLike = (cardId, userId) => {
	return new Promise((resolve, reject) => {
		Card.updateOne({ _id: cardId }, { $addToSet: { likes: userId } })
			.then(
				Card.findById({ _id: cardId })
					.then((card) => resolve(card))
			)
			.catch(() => reject("DB Error!"))
		reject("No card found!")
	})
}



const deleteCard = (cardId) => {
	return new Promise((resolve, reject) => {
		Card.findByIdAndDelete(cardId)
			.then((card) => resolve(card))
			.catch((err) => reject(err))
	})
}
module.exports = {
	getAllCards,
	getUserCards,
	insertOneCard,
	getOneCard,
	updateCard,
	deleteCard,
	addLike,
}
