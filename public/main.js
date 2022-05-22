$(function() {
	$.get("/cards/allCards", (res) => console.log(res))
		// .then((res) => console.log(res))
		// .catch((e) => console.warn(e))

	let tempCard = {
		bName: "HaShahar",
		bDesc: "chocolate in any form",
		bAddr: "Tel-Aviv",
		bPhone: "097964123",
		bImageUrl: "https://has.co.il/assets/images/hasbox.png",
	}
	$('[data-create="createCard"]').on("click", () => {
		$.post("/cards/newCard", { ...tempCard }).then((res) =>
			console.log(res)
		)
	})
})
