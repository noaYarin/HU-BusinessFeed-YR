const Card = require("../models/card"),
	_ = require("lodash"),
	Suid = require("short-unique-id")
const castObjectId = require("mongoose").Types.ObjectId

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
const insertOneCard = (cardData, ownerId) => {
	return new Promise((resolve, reject) => {
		uniqueCardId = new Suid({ length: 5 })
		_.set(cardData, "likes", [])
		_.set(cardData, "cardId", uniqueCardId())
		_.set(cardData, "ownerId", ownerId)
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
		Card.findOne({
			$or: [
				{ cardId },
				{ _id: castObjectId.isValid(cardId) ? cardId : null },
			],
		})
			.then((card) => {
				card ? resolve(card) : reject("No Card Found!")
			})
			.catch((err) => reject(err))
	})
}

const updateCard = (_id, tokenData, cardData) => {
	return new Promise((resolve, reject) => {
		if (!tokenData.isBusiness || !tokenData.isAdmin) {
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

let setCardId = (_id, isAdmin, adminInput) => {
	if (!isAdmin) return "You do not have permission to update this card!"
	return new Promise((resolve, reject) => {
		checkUniqueId(adminInput)
			.then(() => {
				Card.findByIdAndUpdate(
					{ _id },
					{ $set: { cardId: adminInput } }
				)
					.then((card) => {
						resolve(card)
					})
					.catch((err) => {
						reject(err)
					})
			})
			.catch((err) => {
				reject(err)
			})
	})
}

const addLike = (cardId, userId) => {
	return new Promise((resolve, reject) => {
		Card.updateOne({ _id: cardId }, { $addToSet: { likes: userId } })
			.then(Card.findById({ _id: cardId }).then((card) => resolve(card)))
			.catch(() => reject("DB Error!"))
		reject("No card found!")
	})
}

let checkUniqueId = (uniqueCardId) => {
	return new Promise((resolve, reject) => {
		Card.findOne({ cardId: uniqueCardId })
			.then(() => resolve("Card with this unique id not exists!"))
			.catch(() => reject("Card with this unique id already exist!"))
	})
}

const deleteCard = (cardId, decodedToken) => {
	const { _id: ownerId, isAdmin, isBusiness } = decodedToken
	return new Promise((resolve, reject) => {
		if (!isBusiness && !isAdmin) {
			reject("You do not have permission to update this card!")
		}
		if (isAdmin || existCard(cardId, ownerId)) {
			Card.findOneAndDelete({ _id: cardId }).then((card) => {
				if (!card) {
					reject("You do not have permission to delete this card!")
				} else {
					resolve(card)
				}
			})
		}
	}).catch((err) => reject(err))
}

module.exports = {
	getAllCards,
	getUserCards,
	insertOneCard,
	getOneCard,
	updateCard,
	setCardId,
	deleteCard,
	addLike,
}
