require("dotenv").config()
const express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	port = process.env.PORT || 3000,
	host = process.env.HOST || "localhost",
	dbHost = process.env.DBHOST || "mongodb://0.0.0.0:27017",
	userRouter = require("./routes/userRouter"),
	cardRouter = require("./routes/cardRouter")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/user", userRouter)
app.use("/cards", cardRouter)

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
