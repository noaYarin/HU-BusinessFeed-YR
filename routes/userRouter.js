const express = require("express"),
	userRouter = express.Router(),
	chalk = require("chalk"),
	{
		signUp,
		signIn,
		verifyToken,
		getUser,
	} = require("../controllers/userController")

userRouter.post("/signUp", (req, res) => {
	let newUser = req.body
	signUp(newUser)
		.then((user) => res.status(200).json(user))
		.catch((err) => {
			console.log(chalk.red(err))
			res.status(400).json(err)
		})
})

userRouter.post("/signIn", (req, res) => {
	let user = req.body
	signIn(user)
		.then((user) => res.status(200).json(user))
		.catch((err) => res.status(400).json(err))
})

userRouter.get("/:userId", (req, res) => {
	let { userId } = req.params
	getUser(userId)
		.then((user) => res.status(200).json(user))
		.catch((err) => res.status(401).json(err))
})

module.exports = userRouter
