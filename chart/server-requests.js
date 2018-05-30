function makeRequest(args, then) {
    const link = "http://t.vkbc.ru/" + args;
    console.log(link);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.statusText);
        } else {
            data = JSON.parse(xhr.responseText)['response'];
            then(data);
        }
    };
    xhr.send();
}

function loadPoints(pid) {
    pid = pid ? pid : 3;
    makeRequest(`load_project?id=${pid}`, drawPoints);
}

function onPointDrag(event) {
    // console.log(event.el);
    const pointID = event.el.id.slice(11);
    const x = event.el.style.left.slice(0, event.el.style.left.length-2);
    const y = event.el.style.top.slice(0, event.el.style.top.length-2);
    makeRequest("replace_point?pid="+projectID+"&id="+pointID+"&x="+x+"&y="+y, ()=>{})
}

function drawPoint(point) {
    const newWindow = document.createElement("div");
    newWindow.classList.add("window");
    newWindow.classList.add("fresh");
    newWindow.id = "chartWindow" + point["id"];
    newWindow.innerText = point["title"];
    newWindow.style.top = point["y"] + "px";
    newWindow.style.left = point["x"] + "px";
    newWindow.ondrag = onPointDrag;
    newWindow.addEventListener("click", function(event) { showChangePanel(event.target.id.slice(11)); });
    document.querySelector(".chart-demo").appendChild(newWindow);
}

function drawConnection(from, to) {
    instance.connect({uuids: ["chartWindow" + from + "-bottom",
        "chartWindow" + to + "-top" ], overlays: overlays});
}

function drawConnections(point) {
    for (let to of point["children"]) {
        drawConnection(point["id"], to);
    }
}

function drawPoints(data) {
    const points = data['points'];
    for (let pointId in points) {
        let point = points[pointId];
        point["id"] = pointId;
        drawPoint(point);
    }
    prepareJSPlumb();
    for (let pointId in points) {
        let point = points[pointId];
        point["id"] = pointId;
        drawConnections(point);
    }
}



let projectID = 3;
function uploadChild(parent, title) {
    makeRequest("/add_child?pid="+projectID+"&parent_id="+parent+"&title="+title+
    "&desc=", function(data) {
        const newPointID = data["points"][parent]["children"][data["points"][parent]["children"].length - 1];
        const newPoint = data["points"][newPointID];
        newPoint["id"] = newPointID;
        drawPoint(newPoint);
        prepareJSPlumb();
        drawConnection(parent, newPoint["id"]);
    });
}

function removePoint(pointID) {
    makeRequest("/del_point?pid="+projectID+"&id="+pointID, function() {
        //document.querySelector("#chartWindow" + pointID).remove();
        // [...document.querySelectorAll(".chartWindow")].forEach(x=>x.remove());
        // loadPoints(projectID);
        location.reload();
    });
}

