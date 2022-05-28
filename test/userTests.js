require("dotenv").config()
const chai = require("chai"),
	chaiHttp = require("chai-http"),
	assert = chai.assert,
	expect = chai.expect,
	server = process.env.SERVER

chai.use(chaiHttp)

describe("User controller functions", () => {
	it("Should sign a new user ", () => {
		chai.request(server)
			.post("/user/signUp")
			.send({
				userName: "yael",
				email: "yael12@gmail.com",
				password: "123456AzA",
				isBusiness: false,
			})
			.end(function(err, res) {
				expect(err).to.be.null
				assert.equal(res.status, 200)
				assert.equal(res.type, "application/json")
			})
	})

	it("Should sign in a user ", () => {
		chai.request(server)
			.post("/user/signIn")
			.send({ email: "yael12@gmail.com", password: "123456AzA" })
			.end(function(err, res) {
				expect(err).to.be.null
				res.type.should.equal("application/json")
			})
	})

	it("Get user by id", () => {
		chai.request(server)
			.get("/user")
			.then(function(res) {
				expect(res).to.have.status(200)
				expect(res.body).to.be.an("object")
			})
			.catch(function(err) {
				throw err
			})
	})
})
