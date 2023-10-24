const form = document.querySelector("form"),
	idInput = form.querySelector("#user-id"),
	submitButton = form.querySelector("#submit"),
	output = document.querySelector(".output"),
	outputError = output.querySelector(".error"),
	outputList = output.querySelector("ul");

form.addEventListener("submit", (event) => {
	event.preventDefault();

	outputError.classList.add("display-none");
	outputList.innerHTML = "";

	const userId = idInput.value,
		url = `https://jsonplaceholder.typicode.com/users/${userId}/todos`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.length === 0) {
				outputError.classList.remove("display-none");
				return;
			}

			let listItems = data.map((item) =>
				createUserListItem(userId, item.id, item.title, item.completed)
			);

			outputList.append(...listItems);
		});
});

function createUserListItem(userId, id, title, completed) {
	const listItem = document.createElement("li");

	if (completed) {
		listItem.classList.add("completed");
	}

	listItem.innerHTML = `${id}: ${title}. ID пользователя: ${userId}`;
	return listItem;
}
