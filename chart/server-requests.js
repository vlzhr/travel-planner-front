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

function drawPoint(point) {
    const newWindow = document.createElement("div");
    newWindow.classList.add("window");
    newWindow.classList.add("fresh");
    newWindow.id = "chartWindow" + point["id"];
    newWindow.innerText = point["title"];
    newWindow.style.top = point["y"] + "px";
    newWindow.style.left = point["x"] + "px";
    newWindow.addEventListener("click", function (event) { showChangePanel(event.target.id.slice(11)); });
    newWindow.addEventListener("dragend", function (event) { console.log(event) });
    document.querySelector(".chart-demo").appendChild(newWindow);
}

function drawConnection(from, to) {
    console.log(from);
    console.log(to);
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

