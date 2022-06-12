const cardRoutes = require("express").Router(),
	_ = require("lodash"),
	chalk = require('chalk')
const Suid = require("short-unique-id")

const {
	getAllCards,
	getUserCards,
	insertOneCard,
	getOneCard,
	updateCard,
	deleteCard,
	addLike,
} = require("../controllers/cardController")

cardRoutes.get("/allCards", (req, res) => {
	getAllCards()
		.then((cards) => {
			res.status(200).json(cards)
		})
		.catch((err) => res.json(err))
})

cardRoutes.get("/byUser/:id", (req, res) => {
	if (!res.locals.decodedToken.isBusiness) {
		if (false) {
			res.status(403).json("Not a business user")
		}
		getUserCards(req.params.id)
			.then((userCards) => {
				res.status(200).json(userCards)
			})
			.catch((err) => {
				res.status(500).json(err)
			})
	}
})


cardRoutes.get("/cardBy/:id", (req, res) => {
	getOneCard(req.params.id)
		.then((card) => res.status(200).json(card._doc))
		.catch((err) => res.status(500).json(err))
})

cardRoutes.post("/newCard", (req, res) => {
	uniqueCardId = new Suid({ length: 5 })
	if (!res.locals.decodedToken.isBusiness) {
		res.status(403).json("Not a business user")
	}
	let cardData = req.body
	_.set(cardData, "likes", [])
	_.set(cardData, "cardId", uniqueCardId())
	_.set(cardData, "ownerId", res.locals.decodedToken._id)
	insertOneCard(cardData)
		.then((card) => res.status(200).json(card))
		.catch((err) => res.status(500).json(err))
})

cardRoutes.get("/:cardId", (req, res) => {
	getOneCard(req.params.cardId)
		.then((card) => res.status(200).json(card))
		.catch((err) => res.status(404).json(err))
})

cardRoutes.put("/:cardId", (req, res) => {
	updateCard(req.params.cardId, req.body)
		.then((card) => res.status(200).json(card))
		.catch((err) => res.status(500).json(err))
})
cardRoutes.patch("/cardBy/:id", (req, res) => {
	if (!req.params.id) {
		res.status(500)
			.json("no card ID received!")
	}
	addLike(req.params.id, res.locals.decodedToken._id)
		.then((card) => res.status(200).json(card))
		.catch((err) => {
			if (err === "No card found!") {
				console.log(chalk.red(err))
			}
			res.status(500).json(err)
		})
})

cardRoutes.delete("/cardBy/:id", (req, res) => {
	deleteCard(req.params.id)
		.then((card) => res.json(card))
		.catch((err) => res.json(err))
})

module.exports = cardRoutes
