function onPointDrag(ev) {
	ev.target.dataset.clickX = ev.clientX - ev.target.offsetLeft;
	ev.target.dataset.clickY = ev.clientY - ev.target.offsetTop;
}

function onPointDrop(ev) {
	ev.target.style.top = (ev.clientY - ev.target.dataset.clickY)+"px";
	ev.target.style.left = (ev.clientX - ev.target.dataset.clickX)+"px";
	dumpPointReplace(ev.target.dataset.id, ev.clientX - ev.target.dataset.clickX, ev.clientY - ev.target.dataset.clickY);
}

function onPointClick(ev) {
	changeEditing(ev.target);
}

function makePointsDraggable() {
	var points = document.querySelectorAll('.field__point');
	[].forEach.call(points, function(point) {
		point.addEventListener('dragstart', onPointDrag, false);
		point.addEventListener('dragend', onPointDrop, false);
		point.addEventListener('click', onPointClick);
	});	
}
