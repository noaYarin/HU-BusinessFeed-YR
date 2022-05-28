require("dotenv").config()
const chai = require("chai"),
	chaiHttp = require("chai-http"),
	assert = chai.assert,
	expect = chai.expect,
	server = process.env.SERVER

chai.use(chaiHttp)

describe("Card controller functions", () => {
	it("Should get all cards ", () => {
		chai.request(server)
			.get("/cards/allCards")
			.end(function(err, res) {
				expect(res).to.have.status(200)
				expect(res.body).to.be.an("array")
			})
	})

	it("Should insert one card", () => {
		chai.request(server)
			.post("/cards/newCard")
			.send({
				bName: "HaShahar",
				bDesc: "chocolate in any form",
				bAddr: "Tel-Aviv",
				bPhone: "097964123",
				bImageUrl: "https://has.co.il/assets/images/hasbox.png",
			})
			.end(function(err, res) {
				expect(err).to.be.null
				assert.equal(res.type, "application/json")
				assert.equal(res.status, 200)
			})
	})

	it("Should get one card by id", () => {
		let cardId = "3n8Hn"
		chai.request(server)
			.get("/user/" + cardId)
			.end(function(err, res) {
				expect(res).to.have.status(200)
				expect(res.body).to.be.an("array")
			})
	})

	it("Should update one card by id", () => {
		let cardId = "3n8Hn"
		chai.request(server)
			.put("/user/" + cardId)
			.end(function(err, res) {
				res.body.should.be.a("object")
				assert.equal(res.type, "application/json")
				assert.equal(res.status, 200)
				expect(err).to.be.null
			})
	})

	it("Should delete one card by id", () => {
		let cardId = "3n8Hn"
		chai.request(server)
			.delete("/user/" + cardId)
			.end(function(err, res) {
				expect(res).to.have.status(200)
				expect(err).to.be.null
			})
	})
})
