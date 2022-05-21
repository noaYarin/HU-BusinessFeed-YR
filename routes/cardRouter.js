const cardRoutes = require("express").Router();
const { getAllCards, insertOneCard, getOneCard, updateCard, deleteCard} = require("../controllers/cardController");
cardRoutes.get("/", (req, res) => {
	getAllCards()
		.then((cards) => res.json(cards))
		.catch((err) => res.json(err));
});
cardRoutes.post("/", (req, res) => {
	insertOneCard(req.body)
		.then((card) => res.json(card))
		.catch((err) => res.json(err));
});
cardRoutes.get("/byId/:id", (req, res) => {
	getOneCard(req.params.id)
		.then((card) => res.json(card))
		.catch((err) => res.json(err));
});
cardRoutes.put("/:id", (req, res) => {
	updateCard(req.params.id, req.body)
		.then((card) => res.json(card))
		.catch((err) => res.json(err));
});
cardRoutes.delete("/:id", (req, res) => {
	deleteCard(req.params.id)
		.then((card) => res.json(card))
		.catch((err) => res.json(err));
});
module.exports = cardRoutes;
