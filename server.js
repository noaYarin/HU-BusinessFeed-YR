require("dotenv").config()
const express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	port = process.env.PORT || 4000,
	host = process.env.HOST || "localhost",
	dbHost = process.env.DBHOST || "mongodb://0.0.0.0:27017",
	userRouter = require("./routes/userRouter"),
	cardRouter = require("./routes/cardRouter"),
	auth = require("./services/auth"),
	cors = require("cors")

//#region middlewares
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
var corsOptions = {
	origin: "http://example.com",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//#endregion

//#region Custom middleware
app.use((req, res, next) => {
	if (auth.authorizedRequests(req.originalUrl)) {
		return next()
	}

	token = req.headers["authorization"]
	if (token) {
		auth.verifyToken(token)
			.then((data) => {
				res.locals.decodedToken = data
				return next()
			})
			.catch(() => res.status(401).json("Invalid Token!"))
	} else {
		res.status(401).json("Unaothorized access!")
	}
})
//#endregion

//#region Routers
app.use("/user", userRouter)
app.use("/cards", cardRouter)
//#endregion

//#region  PORT OPEN
mongoose.set("useCreateIndex", true)
mongoose
	.connect(`${dbHost}/businessFeed`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(port, () => {
			console.info(
				`start server start listening on port http://${host}:${port}`
			)
		})
	})
	.catch((err) => console.error(err))
//#endregion
