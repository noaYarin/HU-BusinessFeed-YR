$(function() {
	$('[data-get="getData"]').on("click", () => {
		$.get("/cards/allCards", (res) => populateTable(res))
	})
	$('[data-get="getUserCards"]').on("click", () => {
		let userId = $('[data-user="userId"]')[0].value
		let token = localStorage.getItem("userToken")
		$.ajax({
			beforeSend: function(request) {
				request.setRequestHeader("authorization", token)
			},
			type: "GET",
			url: `/cards/byUser/${userId}`,
		})
			.then((res) => populateTable(res))
			.catch((err) => console.log(err))
	})
	$('[data-get="getCardUnique"]').on("click", () => {
		let cardUniqueId = $('[data-card="carUniquedId"]')[0].value
		let token = localStorage.getItem("userToken")
		$.ajax({
			beforeSend: function(request) {
				request.setRequestHeader("authorization", token)
			},
			type: "GET",
			url: `/cards/byUnique/${cardUniqueId}`,
		})
			.then((res) => showSingleCard(res))
			.catch((err) => console.log(err.responseJSON))
	})
	$('[data-get="getCard"]').on("click", () => {
		let cardId = $('[data-card="cardId"]')[0].value
		let token = localStorage.getItem("userToken")
		$.ajax({
			beforeSend: function(request) {
				request.setRequestHeader("authorization", token)
			},
			type: "GET",
			url: `/cards/cardBy/${cardId}`,
		})
			.then((res) => showSingleCard(res))
			.catch((err) => console.log(err.responseJSON))
	})

	let tempCard = {
		bName: "HaShahar",
		bDesc: "chocolate in any form",
		bAddr: "Tel-Aviv",
		bPhone: "097964123",
		bImageUrl: "https://has.co.il/assets/images/hasbox.png",
	}

	const populateTable = (data) => {
		$("#bCard-table").empty()
		$.each(data, (_, card) => {
			let row = $("#bCard-table").append(
				`<tr value=${card._id}>
				<td>${card.bName}</td>
				<td>${card.bPhone}</td>
				<td>${card.bDesc}</td>
				<td>${card.cardId}</td>
				<td>${card.bAddr}</td>
				<td>${card.ownerId}</td>
				</tr>`
			)
		})
	}
	const showSingleCard = (data) => {
		$("#bCard-table").empty()
		// $.each(data, (_, card) => {
		let row = $("#bCard-table").append(
			`<tr value=${data._id}>
				<td>${data.bName}</td>
				<td>${data.bPhone}</td>
				<td>${data.bDesc}</td>
				<td>${data.cardId}</td>
				<td>${data.bAddr}</td>
				</tr>`
		)
		// })
	}

	let userInfo = {
		userName: "JohnDoe",
		email: "johndoe@gmail.com",
		password: "123456789",
		isBusiness: true,
	}

	$("#signin").on("click", () => {
		$.post("/user/signIn", { ...userInfo }, (res) => {
			localStorage.setItem("userToken", res)
		})
	})
	if (localStorage.getItem("userinfo")) {
		$("#register").attr("disabled", true)
	}
	$("#register").on("click", () => {
		$.post("/user/signUp", { ...userInfo }, (res) => {
			localStorage.setItem("userinfo", JSON.stringify(res))
		})
	})

	$('[data-create="createCard"]').on("click", () => {
		let token = localStorage.getItem("userToken")
		$.ajax({
			beforeSend: function(request) {
				request.setRequestHeader("authorization", token)
			},
			type: "POST",
			url: "/cards/newCard",
			data: { ...tempCard },
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
	})
})
