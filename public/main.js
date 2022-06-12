$(function () {

	//#region initializing
	$("#bCard").hide()
	$("#uCard").hide()
	$('#register-fields').hide()
	$("#signout").hide()
	$("#cards-table").hide()
	if (localStorage.getItem('userToken')) {
		$("#signin-signup").hide()
		$("#signout").show()
		$("#signin").hide()
		$("#register").hide()

	}
	if (localStorage.getItem('localDb')) {
		$('[data-get="getData"]').hide()
		$('[data-get="showLocal"]').show()
	}
	//#endregion

	//#region user controllers
	$("#register").on("click", () => {
		$('#register-fields').show()
		$("#user-controlls").hide()
	})
	$("#cancel-signup").on("click", () => {
		$('#register-fields').hide()
		$("#user-controlls").show()
	})
	$("#signup").on("click", () => {
		$.post("/user/signUp", getUserSignFields(), (res) => {
			localStorage.setItem("userInfo", JSON.stringify(res))
		})
	})

	function getUserSignFields() {
		let userInfo = {}
		$.each($('#signin-signup input'), (i, input) => {
			if (input.type === 'checkbox') {
				userInfo[ $(input).prop('name') ] = $(input).prop('checked')
			} else {
				userInfo[ $(input).prop('name') ] = $(input).val()
			}
		})
		return userInfo
	}

	function clearUserSignFields() {
		$.each($('#signin-signup input'), (i, input) => {
			if ($(input).type === 'checkbox') {
				$(input).prop('checked', false)
			} else {
				$(input).val('')
			}
		})
	}

	$("#signin").on("click", () => {
		$('#register-fields').hide()
		let { email, password } = getUserSignFields()
		$.post("/user/signIn", {
			email, password
		}, (res, status) => {
			if (status === "success") {
				clearUserSignFields()
				$("#signin-signup").hide()
				$("#signout").show()
				localStorage.setItem("userToken", res.token)
				localStorage.setItem("userInfo", JSON.stringify(res.user))
			} else {
				console.log(res)
			}
		})
	})

	$("#signout").on("click", () => {
		localStorage.removeItem('userToken')
		localStorage.removeItem('userInfo')
		$("#signout").hide()
		$("#signin-signup").show()
	})
	//#endregion

	//#region cards conrollers
	$('[data-get="getData"]').on("click", () => {
		$('[data-get="getData"]').hide()
		$.get("/cards/allCards", (res) => {
			localStorage.setItem("localDb", JSON.stringify(res))
			populateTable(res)
		})
	})
	$('[data-get="showLocal"]').on('click', () => {
		populateTable(JSON.parse(localStorage.getItem("localDb")))
	})

	$('[data-get="getUserCards"]').on("click", () => {
		let userId = $('[data-user="userId"]')[ 0 ].value
		let token = localStorage.getItem("userToken")
		$("#uCard").hide()
		$("#uCard-data").empty()
		$("#bCard").hide()
		$("#bCard-data").empty()
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("authorization", token)
			},
			type: "GET",
			url: `/cards/byUser/${userId}`,
		})
			.then((res) => populateTable(res))
			.catch((err) => console.log(err))
	})

	$('[data-get="getCard"]').on("click", () => {
		let cardId = $('[data-card="cardId"]')[ 0 ].value
		let token = localStorage.getItem("userToken")
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("authorization", token)
			},
			type: "GET",
			url: `/cards/cardBy/${cardId}`,
		})
			.then((res) => showSingleCard(res))
			.catch((err) => console.log(err.responseJSON))
	})

	$('[data-create="createCard"]').on("click", () => {
		// let tempCard = {
		// 	bName: "HaShahar",
		// 	bDesc: "chocolate in any form",
		// 	bAddr: "Tel-Aviv",
		// 	bPhone: "097964123",
		// 	bImageUrl: "https://has.co.il/assets/images/hasbox.png",
		// }
		let token = localStorage.getItem("userToken")
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("authorization", token)
			},
			type: "POST",
			url: "/cards/newCard",
			data: { ...getCaFields() },
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
	})
	function getCaFields() {
		let cardInfo = {}
		$.each($('#card-fields input'), (i, input) => {
			if (input.type === 'checkbox') {
				cardInfo[ $(input).prop('name') ] = $(input).prop('checked')
			} else {
				cardInfo[ $(input).prop('name') ] = $(input).val()
			}
		})
		return cardInfo
	}

	function clearCardFields() {
		$.each($('#card-fields input'), (i, input) => {
			if ($(input).type === 'checkbox') {
				$(input).prop('checked', false)
			} else {
				$(input).val('')
			}
		})
	}


	const populateTable = (data) => {
		$("#bCard").hide()
		$("#cards-table").show()
		$("#bCard-table").empty()
		$.each(data, (_, card) => {
			let row =
				`<tr id=${card._id}>
				<td>${card.bName}</td>
				<td>${card.bPhone}</td>
				<td>${card.bDesc}</td>
				<td>${card.cardId}</td>
				<td>${card._id}</td>
				</tr>`
			$("#bCard-table").append(row)
		})
		$('#bCard-table').on('click', 'tr', (e) => {
			showSingleCard(e.currentTarget.id)
		});
	}

	$('[data-clear="clear-table"]').on('click', () => {
		$("#cards-table").hide()
		$('[data-get="getData"]').show()
		if (localStorage.getItem('localDb')) {
			$('[data-get="getData"]').hide()
		}
	})

	const showSingleCard = (dataObj) => {
		$("#bCard").hide()
		$("#bCard-data").empty()
		if (typeof dataObj === 'string') {
			localDb = JSON.parse(localStorage.getItem('localDb'))
			dataObj = localDb.find(card => card._id === dataObj)
		}
		$.each(dataObj, function (key, value) {
			$("#bCard-data").append(`<li>${key} : ${value}</li>`)
		});
		$("#bCard").show()
	}



})
