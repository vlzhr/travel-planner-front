function changeSection(content) {
	const section = document.querySelector("section");

	const newElement = document.createElement("div");
	newElement.classList.add("container");

	newElement.innerHTML = content;

	section.innerHTML = `<div class="container">${content}</div>`

	/*section.appendChild(newElement);
	section.removeChild(section.firstChild); */
}