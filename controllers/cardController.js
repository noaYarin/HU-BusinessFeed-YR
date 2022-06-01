const Card = require("../models/card"),
	_ = require("lodash")

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
			// .then((cards) => {
			// 	cards ? resolve(cards) : reject("No Cards Found!")
			// })
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
const getOneCardUnique = (cardUniqueId) => {
	return new Promise((resolve, reject) => {
		Card.findOne({ cardId: cardUniqueId })
			.then((card) => {
				card ? resolve(card) : reject("No Card Found!")
			})
			.catch((err) => reject(err))
	})
}
const getOneCard = (cardId) => {
	return new Promise((resolve, reject) => {
		Card.findOneById(cardId).then((card) => {
			card ? resolve(card) : reject("No Card Found!")
		})
		Card.findOne(cardId)
			.then((card) => resolve(card))

			.catch((err) => reject(err))
	})
}
const updateCard = (_id, tokenData, cardData) => {
	return new Promise((resolve, reject) => {
		if (!tokenData.isBusiness) {
			reject("You do not have permission to update this card!")
		} else {
			const card = new Card(cardData)
			let { error } = card.validateBusinessCard(cardData)
			if (error) {
				let err = error.details[0].message
				reject(err)
			} else {
				existCard(_id, tokenData._id)
					.then(() => {
						Card.findByIdAndUpdate({ _id }, { $set: cardData })
							.then((updatedCard) => {
								resolve(updatedCard)
							})
							.catch((err) => reject(err))
					})
					.catch((err) => reject(err))
			}
		}
	})
}

let existCard = (cardId, userId) => {
	return new Promise((resolve, reject) => {
		Card.findOne({ _id: cardId, ownerId: userId })
			.then((card) => resolve(card._doc))
			.catch(() => reject("Card does not exist!"))
	})
}

const deleteCard = (cardId, ownerId) => {
	return new Promise((resolve, reject) => {
		Card.findOneAndDelete({
			_id: cardId,
			ownerId,
		}).then((card) => {
			if (!card) {
				reject("You do not have permission to delete this card!")
			} else {
				resolve(card)
			}
		})
	}).catch((err) => reject(err))
}

module.exports = {
	getAllCards,
	getUserCards,
	insertOneCard,
	getOneCardUnique,
	getOneCard,
	updateCard,
	deleteCard,
}
