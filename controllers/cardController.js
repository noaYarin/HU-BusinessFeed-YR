const mongoose = require("mongoose");
const Card= require("../models/card");


const getAllCards = () => {
	return new Promise((resolve, reject) => {
		Card.find({})
			.then((cards) => resolve(cards))
			.catch((err) => reject(err));
	});
};
const insertOneCard = (cardData) => {
	return new Promise((resolve, reject) => {
		const card= new Card(cardData)
			.save()
			.then((card) => resolve(card))
			.catch((err) => reject(err));
	});
};
const getOneCard = (id) => {
	return new Promise((resolve, reject) => {
		Card.findById(id)
			.then((card) => resolve(card))
			.catch((err) => reject(err));
	});
};
const updateCard = (id, cardData) => {
	return new Promise((resolve, reject) => {
		Card.findByIdAndUpdate(id, cardData)
			.then((card) => resolve(card))
			.catch((err) => reject(err));
	});
};
const deleteCard = (id) => {
	return new Promise((resolve, reject) => {
		Card.findByIdAndDelete(id)
			.then((card) => resolve(card))
			.catch((err) => reject(err));
	});
};
module.exports.cardController = {getAllCards,insertOneCard,getOneCard,updateCard,deleteCard}