require("dotenv").config()
const chai = require("chai"),
	chaiHttp = require("chai-http"),
	assert = chai.assert,
	expect = chai.expect,
	server = process.env.SERVER

chai.use(chaiHttp)

describe("Card controller functions", () => {
	it("Should get all cards ", (done) => {
		chai.request(server)
			.get("/cards/allCards")
			.set("content-type", "application/json")
			.end(function(err, res) {
				expect(res).to.have.status(200)
				done()
			})
	})

	it("Should insert one card", (done) => {
		chai.request(server)
			.post("/cards/newCard")
			.set("authorization", "Bearer " + process.env.TOKEN)
			.type("form")
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
				done()
			})
	})

	it("Should get one card by id", (done) => {
		let cardId = "62a525e1e4d8075ba00c938d"
		chai.request(server)
			.get("/cards/cardBy/" + cardId)
			.set("authorization", "Bearer " + process.env.TOKEN)
			.end(function(err, res) {
				expect(res).to.have.status(200)
				done()
			})
	})

	it("Should get one card by unique id", (done) => {
		let cardId = "rY2LY"
		chai.request(server)
			.get("/cards/byUnique/" + cardId)
			.set("authorization", "Bearer " + process.env.TOKEN)
			.end(function(err, res) {
				expect(res).to.have.status(200)
				expect(res.body).to.be.an("object")
				done()
			})
	})

	it("Should update one card by id", (done) => {
		let cardId = "62a525e0e4d8075ba00c938b"
		chai.request(server)
			.put("/cards/cardBy/" + cardId)
			.set("content-type", "application/json")
			.type("form")
			.set("authorization", "Bearer " + process.env.TOKEN)
			.send({
				bName: "HaShahar",
				bDesc: "chocolate in any form",
				bAddr: "Tel-Aviv",
				bPhone: "097964123",
				bImageUrl: "https://has.co.il/assets/images/hasbox.png",
			})
			.end(function(err, res) {
				expect(res.body).to.be.an("object")
				expect(res).to.have.status(200)
				expect(err).to.be.null
				done()
			})
	})

	it("Should update one card by id only for Admin user", (done) => {
		let cardId = "62a0acba00309a16c042d81a"
		chai.request(server)
			.patch("/cards/cardBy/" + cardId)
			.set("content-type", "application/json")
			.set("authorization", "Bearer " + process.env.TOKEN)
			.send({ cardId: "gggguuuuuu" })
			.end(function(err, res) {
				expect(res.body).to.be.an("object")
				expect(res).to.have.status(200)
				expect(err).to.be.null
				done()
			})
	})

	it("Should delete one card by id", (done) => {
		let cardId = "62a525dfe4d8075ba00c9389"
		chai.request(server)
			.delete("/cards/cardBy/" + cardId)
			.set("authorization", "Bearer " + process.env.TOKEN)
			.set("content-type", "application/x-www-form-urlencoded")
			.end(function(err, res) {
				expect(res).to.have.status(200)
				expect(err).to.be.null
				done()
			})
	})
})
