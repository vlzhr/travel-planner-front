function makeRequest(args, then) {
	const link = "http://t.vkbc.ru/" + args;
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

function dumpPointReplace(id, x, y) {
	const pid = document.querySelector(".canvas__title").dataset.id;
	makeRequest(`replace_point?pid=${pid}&id=${id}&x=${x}&y=${y}`, drawProject)
}

function rerenderPoint(data) {
	const el = document.querySelector(`.point-${data.id}`);
	el.parentNode.removeChild(el);
	document.querySelector(".canvas__field").innerHTML += renderPoint(data.id, data);
	makePointsDraggable();
}

function savePoint() {
	const pid = document.querySelector(".canvas__title").dataset.id;
	const id = document.querySelector(".point__but").dataset.id;
	const title = document.querySelector(".point__title").value;
	const desc= document.querySelector(".point__desc").value;
	makeRequest(`save_point?pid=${pid}&id=${id}&title=${title}&desc=${desc}`, drawProject);
}

function addChild() {
	const pid = document.querySelector(".canvas__title").dataset.id;
	const parentId = document.querySelector(".point__but").dataset.id;
	const title = document.querySelector(".child__title").value;
	const desc= document.querySelector(".child__desc").value;
	makeRequest(`add_child?pid=${pid}&parent_id=${parentId}&title=${title}&desc=${desc}`, drawProject);
}

function changeEditing(point) {
	point = point.dataset;
	document.querySelector(".point__but").dataset.id = point.id;
	document.querySelector(".point__title").value = point.title;
	document.querySelector(".point__desc").value = point.desc;
}