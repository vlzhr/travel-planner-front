function getVkFriends(args, then) {
	const link = "http://t.vkbc.ru/get_friends?ui=" + args;
	console.log(link);
	const xhr = new XMLHttpRequest();
	xhr.open('GET', link, true);

	xhr.onreadystatechange = () => {
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
			console.log(xhr.statusText);
		} else {
			data = JSON.parse(xhr.responseText)['response'];
			then(data);
		}
	};
	xhr.send();
}

function changeUi(ev) {
	document.querySelector(".ui-input").value = ev.target.dataset.ui;
}

function drawFriends(data) {
	console.log(data['response']);
	data = data['response'];
	const ul = document.querySelector(".friends-list");
	for (let ui in data) {
		let user = data[ui];
		/*console.log(user);
		const newEl = document.createElement("li");
		newEl.dataset.ui = ;
		newEl.innerText = user['first_name'] + " " + user['last_name'];*/
		ul.innerHTML += `<li onclick="changeUi(event)" data-ui="${user['uid']}">${user['first_name'] + " " + user['last_name']}</li>`

	}
}