const _ = require("lodash"),
	jwt = require("jsonwebtoken")

const generateToken = (user) => {
	let secretKey = process.env.SECRET_KEY
	_.unset(user._doc, "password")
	let token = jwt.sign({ ...user._doc }, secretKey)
	return token
}

const verifyToken = (token) => {
	let secretKey = process.env.SECRET_KEY
	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			secretKey,
			{ ignoreExpiration: true },
			(err, decoded) => {
				!decoded ? reject(err) : resolve(decoded)
			}
		)
	})
}

const authorizedRequests = (url) => {
	requests = [
		"/cards/allCards",
		"/user/signIn",
		"/user/signUp",
		"/favicon.ico",
		"/cards/byUser",
	]
	// req.url in requests
	return requests.indexOf(url) > -1 ? true : false
}
// const unauthorizedRequsts = (req) => {}

module.exports = {
	generateToken,
	verifyToken,
	authorizedRequests,
	// unauthorizedRequsts,
}
