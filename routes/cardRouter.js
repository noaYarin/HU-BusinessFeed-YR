const cardRoutes = require("express").Router(),
	chalk = require("chalk"),
	_ = require("lodash"),
	Suid = require("short-unique-id"),
	{
		getAllCards,
		getUserCards,
		insertOneCard,
		getOneCard,
		updateCard,
		deleteCard,
	} = require("../controllers/cardController")

cardRoutes.get("/allCards", (req, res) => {
	getAllCards()
		.then((cards) => {
			// cards = cards.map((model) => model._doc)
			res.status(200).json(cards)
		})
		.catch((err) => res.json(err))
})

cardRoutes.get("/byUser/:id", (req, res) => {
	// if (!res.locals.decodedToken.isBusiness) {
	if (false) {
		res.status(403).json("Not a business user")
	}
	getUserCards(req.params.id)
		.then((userCards) => {
			res.status(200).json(userCards)
		})
		.catch((err) => res.status(500).json(err))
})

cardRoutes.get("/byUnique/:id", (req, res) => {
	getOneCardUnique(req.params.id)
		.then((card) => res.status(200).json(card))
		.catch((err) => res.status(500).json(err))
})

cardRoutes.get("/cardBy/:id", (req, res) => {
	getOneCard(req.params.id)
		.then((card) => res.status(200).json(card))
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

cardRoutes.put("/cardBy/:id", (req, res) => {
	let { id } = req.params
	updateCard(id, res.locals.decodedToken, req.body)
		.then((card) => res.status(200).json(card))
		.catch((err) => {
			console.log(chalk.red(err))
			res.status(400).json(err)
		})
})

cardRoutes.delete("/cardBy/:id", (req, res) => {
	deleteCard(req.params.id, res.locals.decodedToken._id)
		.then((card) => res.status(200).json(card))
		.catch((err) => res.status(401).json(err))
})

module.exports = cardRoutes
