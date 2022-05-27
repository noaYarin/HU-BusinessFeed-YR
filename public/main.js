$(function() {
	$('[data-get="getData"]').on("click", () => {
		$.get("/cards/allCards", (res) => populateTable(res))
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
				</tr>`
			)
		})
	}

	let userInfo = {
		userName: "John Doe",
		email: "johndoe@gmail.com",
		password: "123456789",
		isBusiness: false,
	}

	$("#signin").on("click", () => {
		$.post("/user/signIn", { ...userInfo }, (res) => {
			localStorage.setItem("userToken", res)
		})
	})

	$('[data-create="createCard"]').on("click", () => {
		// $.post("/cards/newCard", { ...tempCard }).then((res) =>
		// 	console.log(res)
		// )
		$.ajax({
			type: "POST",
			url: "/cards/newCard",
			data: { ...userInfo },
			beforeSend: function(request) {
				request.setRequestHeader("authorization", "MY_UNIQUE_TOKEN")
			},
			success: function(response) {},
		})
	})
})
