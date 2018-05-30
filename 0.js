function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function drawAuth() {
	const section = document.querySelector("section");
	VK.init({ apiId: 5847252 });
	VK.Widgets.Auth('vk_auth', {"onAuth": onAuth});
	section.innerHTML = `
	<div class="container">
		<h1>Добро пожаловать на Travel Planner!</h1>
		<h2>Авторизуйтесь через VK</h2>
		<div id="vk_auth"></div>
		или
		<h2>Пользуйтесь без сохранения</h2>
		<button onclick="onAuth()">Поехали!</button>
	</div>
	`
}

window.onload = () => {

	getCookie("ui") ? makeRequest(`load_uprojects?id=${getCookie("ui")}`, drawProjects) : drawAuth();

}