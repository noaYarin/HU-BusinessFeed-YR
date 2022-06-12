require("dotenv").config()
const chai = require("chai"),
	chaiHttp = require("chai-http"),
	assert = chai.assert,
	expect = chai.expect,
	server = process.env.SERVER

chai.use(chaiHttp)

describe("User controller functions", () => {
	it("Should sign up a new user ", (done) => {
		chai.request(server)
			.post("/user/signUp")
			.type("form")
			.set("content-type", "application/json")
			.send({
				userName: "yair",
				email: "yair21212@gmail.com",
				password: "123456AzA",
				isBusiness: false,
			})
			.end(function(err, res) {
				expect(err).to.be.null
				assert.equal(res.status, 200)
				done(err)
			})
	})
	it("Should sign in a user ", (done) => {
		chai.request(server)
			.post("/user/signIn")
			.set("content-type", "application/json")
			.send({ email: "yair21212@gmail.com", password: "123456AzA" })
			.end((err, res) => {
				expect(res).to.have.status(200)
				expect(err).to.be.null
				done(err)
			})
	})
	it("Get user by id", (done) => {
		const userId = "6283f85c9d9fcf6f4896878b"
		chai.request(server)
			.get("/user/" + userId)
			.set("authorization", "Bearer " + process.env.TOKEN)
			.set("content-type", "application/json")
			.end((err, res) => {
				expect(res).to.have.status(200)
				expect(res.body).to.be.an("object")
				done(err)
			})
	})
})
