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

function addUser() {
	const ui = document.querySelector(".ui-input");
	const title = document.querySelector(".canvas__title");
	makeRequest(`add_traveller?ui=${ui.value}&name=${title.innerText}&pid=${title.dataset.id}`, (data)=>{});
	ui.value = "";
}

function loadUsers() {
	const ui = getCookie("ui");
	getVkFriends(ui, drawFriends);
}

function getCanvasTemplate() {
	const s = `
		<svg class="arrows">
			<defs>
    			<marker id="arrow" markerWidth="13" markerHeight="13" refx="2" refy="6" orient="auto">
        		<path d="M2,2 L2,11 L10,6 L2,2" style="fill:red;" />
   				</marker>
			</defs>
			<div class="canvas__editor">
				<div class="point-editor">
					<h2 class="canvas__title"></h2>
					<input name="point_title" class="point__title"><br>
					<textarea name="point_desc" class="point__desc"></textarea>
					<button class="point__but">Save</button>
					<img class="to-child" src="https://icon-icons.com/icons2/510/PNG/512/arrow-down-b_icon-icons.com_50479.png" alt="strelka">

					<input name="child_title" class="child__title"><br>
					<textarea name="child_desc" class="child__desc"></textarea>
					<button class="child__but">Add child</button>
				</div>

				<div class="add-user">
					<h3>Add user to this travel</h3>
					<input name="ui" placeholder="ID" class="ui-input">
					<button class="add-user__button">Add</button>
					<button class="load-friends__button">My friends</button>
					<ul class="friends-list">
					</ul>
				</div>
			</div>
			<div class="canvas__field">
			</div>
		</svg>
	`
	const canvas = document.createElement("div");
	canvas.classList.add("canvas");
	canvas.innerHTML = s;
	canvas.querySelector(".point__but").addEventListener('click', savePoint);
	canvas.querySelector(".child__but").addEventListener('click', addChild);
	canvas.querySelector(".add-user__button").addEventListener('click', addUser);
	canvas.querySelector(".load-friends__button").addEventListener('click', loadUsers);
	return canvas;
}

function renderPoint(id, point) {
	return `<div class="field__point point-${id}" data-id="${id}" data-title="${point.title}" data-desc="${point.desc}"
			draggable="true" style="top: ${point.y}px; left: ${point.x}px">
				<h3>${point.title}</h3>
				${point.desc}
			</div>`
}

function makeArrow(p1, p2, n1, n2) {
	const svg = document.querySelector(".arrows");
	// console.log(`M${+p1.x+8},${+p1.y+8} L${+p2.x+8},${+p2.y}`);
	svg.innerHTML += `  <path d="M${+p1.x+18},${+p1.y+8} L${+p2.x+18},${+p2.y+8}"
          					style="stroke:red; stroke-width: 1.25px; fill: none; marker-end: url(#arrow);"
          					class="arrow-${n1}-${n2}"
    					/>`
}

function drawProject(data) {
	const canvas = getCanvasTemplate();
	canvas.querySelector(".canvas__title").innerText = data.name;
	canvas.querySelector(".canvas__title").dataset.id = data.id;
	const points = data['points']

	document.querySelector("section").appendChild(canvas);
	document.querySelector("section").classList.add("canvas-container")
	document.querySelector("section").removeChild(document.querySelector("section").firstChild);
	for (let n in points) {
		document.querySelector(".canvas__field").innerHTML += renderPoint(n, points[n]);
	}
	for (let n in points) {
		for (let n2 of points[n]['children']) {
			makeArrow(points[n], points[n2], n, n2);
		}
	}
	makePointsDraggable();
	document.querySelector(".point-0").click();
}

function onProjectChoice(pid) {
	pid = pid;
	makeRequest(`load_project?id=${pid}`, drawProject);
}