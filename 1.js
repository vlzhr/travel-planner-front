function makeRequest(args, then) {
	const link = "http://t.vkbc.ru/" + args;
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

function onAuth(req={"uid": 0, "first_name": "Неизвестный", "last_name": "Посетитель"}) {
	document.cookie = "ui="+req.uid;
	document.cookie = "first_name="+req.first_name;
	document.cookie = "last_name="+req.last_name;

	loadProjectChoice(req);
}

function addProject() {
	name = document.querySelector(".add-project-input").value;
	makeRequest(`add_project?name=${name}&ui=${getCookie("ui")}`, drawProjects);
}

function delProject(ev, pid) {
	ev.stopPropagation();
	makeRequest(`del_project?id=${pid}&ui=${getCookie("ui")}`, drawProjects);
}

function drawProjects(data) {
	const header = `
		<h1>Ваши путешествия</h1>
		<p>Добро пожаловать, ${getCookie("first_name")} ${getCookie("last_name")}!<br>
		Выберите или добавьте новое путешествие для планирования.</p>
	`;
	const newPr = `<div class="add-project">
						<input placeholder="Новый проект" class="add-project-input">
						<button onclick="addProject()" class="add-project-but">Add</button>
					</div>`;
	let oldPr = "";
	for (let pr of data) {
		oldPr += `<li class="project-${pr.id}" onclick="onProjectChoice(${pr.id})"><span>${pr.name}</span>
				  <button onclick="delProject(event, ${pr.id})" class="del-button add-project-but">Del</button>
				  </li>
				  `;
	}

	changeSection(header+newPr+oldPr);
}

function loadProjectChoice(req) {
	makeRequest(`load_uprojects?id=${req.uid}`, drawProjects);
}





	/* 
	first_name
:
"Владимир"
hash
:
"b5d0d7983df5728d5a9ef659ff0e29b9"
last_name
:
"Журавлев"
photo
:
"https://pp.userapi.com/c639625/v639625067/5b581/ywtGQaSGS50.jpg"
photo_rec
:
"https://pp.userapi.com/c639625/v639625067/5b584/6GZkMWg5ieM.jpg"
session
:
expire
:
1512693976
mid
:
163663706
secret
:
"83ab75393d"
sid
:
"233e0a494fd42cea97cbd980cac3154a6ad410a18a17a8b6d8fa4b2390d3c85acdfcbcfd37ba936190415"
sig
:
"22c10ed8132dafbc496598bf2a6bc232"
uid
:
163663706
*/