const cardRoutes = require("express").Router(),
	_ = require("lodash")
const Suid = require("short-unique-id"),
	uniqueCardId = new Suid({ length: 5 })

const {
	getAllCards,
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
cardRoutes.get("/byUser/:userId", (req, res) => {
	let userId = req.params.userId
	getAllCards({ id: userId })
		.then((cards) => {
			// cards = cards.map((model) => model._doc)
			res.status(200).json(cards)
		})
		.catch((err) => res.json(err))
})

cardRoutes.post("/newCard", (req, res) => {
	let cardData = req.body
	if (!res.locals.isBusiness) {
		res.status(403).json("Not a business user")
	}
	cardData = req.body
	_.set(cardData, "likes", [])
	_.set(cardData, "cardId", uniqueCardId())
	_.set(cardData, "ownerId", "62892e8c0ffcb74d08e9f900")
	insertOneCard(cardData)
		.then((card) => res.status(200).json(card))
		.catch((err) => res.status(500).json(err))
})

cardRoutes.get("/card/:cardId", (req, res) => {
	getOneCard(req.params.id)
		.then((card) => res.json(card))
		.catch((err) => res.json(err))
})

cardRoutes.put("/:cardId", (req, res) => {
	updateCard(req.params.cardId, req.body)
		.then((card) => res.json(card))
		.catch((err) => res.json(err))
})

cardRoutes.delete("/:id", (req, res) => {
	deleteCard(req.params.id)
		.then((card) => res.json(card))
		.catch((err) => res.json(err))
})

module.exports = cardRoutes
