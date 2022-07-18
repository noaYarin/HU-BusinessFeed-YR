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
	cors = require("cors"),
	fs = require("fs"),
	morgan = require("morgan"),
	path = require("path"),
	routerCache = require("./routerCache"),
	nodeMailer = require('nodemailer');

const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "access.log"),
	{ flags: "a" }
)

app.use(morgan("combined", { stream: accessLogStream }))

const corsOption = {
	origin: [ "http://localhost:3000" ],
}
app.use(cors(corsOption))
app.use(routerCache)

//#region middlewares
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//#endregion

//#region Custom middleware
app.use((req, res, next) => {
	if (auth.authorizedRequests(req.originalUrl)) {
		return next()
	}
	token = req.headers[ "authorization" ]
	if (token) {
		token = token.replace("Bearer ", "")
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
		useFindAndModify: false,
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


const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
	//options
});

const transporter = nodeMailer.createTransport({
	service:"gmail",
	auth: {
		user: process.env.SMTP_MAIL,
		pass:process.env.SMTP_PASSWORD
	},
});

emailUser = {
	email: process.env.SMTP_MAIL,
	subject: "Hello from Business Feed",
	message: "",
	html: "<h1>Hi Yarin!</h1>"
}
const mailOptions = {
	from: process.env.SMTP_MAIL,
	to: emailUser.email,
	subject: emailUser.subject,
	text: emailUser.message,
	html: emailUser.html
};

// verify connection configuration

server.listen(587, () => {
	transporter.verify(function (error, success) {
		if (error) return console.log(error);
		console.log('Server is ready to take our messages');
	});
});

transporter.sendMail(mailOptions);
