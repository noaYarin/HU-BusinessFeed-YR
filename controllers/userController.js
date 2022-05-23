require("dotenv").config()
const User = require("../models/user"),
	bcrypt = require("bcrypt"),
	_ = require("lodash")
const { generateToken, verifyToken } = require("../services/auth")

const signUp = (newUser) => {
	return new Promise((resolve, reject) => {
		let user = new User(newUser)
		let { error } = user.validateUserFields(user._doc)
		if (error) {
			let err = error.details[0].message
			reject(err)
		} else {
			user.password = user.hashUserPassword(user.password)
			user.save()
				.then((user) => resolve(user))
				.catch((err) => {
					err = err.keyPattern
						? "Email already exists"
						: "DB error. Try again later"
					reject(err)
				})
		}
	})
}

const signIn = (user) => {
	return new Promise((resolve, reject) => {
		User.findOne({ email: user.email })
			.then((recordedUser) => {
				bcrypt.compare(
					user.password,
					recordedUser.password,
					(err, results) => {
						if (err) reject(err)
						if (!results) reject("Wrong password")
						else {
							resolve(generateToken(recordedUser))
						}
					}
				)
			})
			.catch(() => reject("Invalid email or password"))
	})
}

// const generateToken = (user) => {
// 	let secretKey = process.env.SECRET_KEY
// 	_.unset(user._doc, "password")
// 	let token = jwt.sign({ ...user._doc }, secretKey)
// 	return token
// }

// const verifyToken = (token) => {
// 	let secretKey = process.env.SECRET_KEY
// 	return new Promise((resolve, reject) => {
// 		jwt.verify(token, secretKey, (err, decoded) => {
// 			err ? reject(err) : resolve(decoded)
// 		})
// 	})
// }

const getUser = (userId) => {
	return new Promise((resolve, reject) => {
		User.findById(userId)
			.then((user) => {
				_.unset(user._doc, "password")
				resolve(user)
			})
			.catch((err) => reject(err))
	})
}

module.exports = {
	signUp,
	signIn,
	verifyToken,
	getUser,
}
