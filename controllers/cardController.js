const Card = require("../models/card"),
	_ = require("lodash")
// const { generateToken, verifyToken } = require("../services/auth")

const getAllCards = () => {
	return new Promise((resolve, reject) => {
		Card.find({})
			.then((cards) => resolve(cards))
			.catch((err) => reject(err))
	})
}
const insertOneCard = (cardData) => {
	return new Promise((resolve, reject) => {
		const card = new Card(cardData)
		let { error } = card.validateBusinessCard(card._doc)
		if (error) {
			let err = error.details[0].message
			reject(err)
		}
		card.save()
			.then((card) => resolve(card))
			.catch((err) => reject(err))
	})
}
const getOneCard = (cardId) => {
	return new Promise((resolve, reject) => {
		Card.findOne(cardId)
			.then((card) => resolve(card))
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
const deleteCard = (cardId) => {
	return new Promise((resolve, reject) => {
		Card.findByIdAndDelete(cardId)
			.then((card) => resolve(card))
			.catch((err) => reject(err))
	})
}
module.exports = {
	getAllCards,
	insertOneCard,
	getOneCard,
	updateCard,
	deleteCard,
}
