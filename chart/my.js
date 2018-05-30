let selectedWindowID = 0;
const changeForm = document.querySelector(".change-form");
const changeInput = document.querySelector(".change-form__input");
const addConnectionInput = document.querySelector(".change-form__add-connection");
let instance;
const arrowCommon = { foldback: 0.7, fill: "red", width: 14 };
let overlays =
        [[ "Arrow", { location: 0.7 }, arrowCommon ],
        [ "Label", { label: "new"} ]];


function showChangePanel( windowID ) {
    changeForm.style.display = "block";
    selectedWindowID = windowID;
    changeInput.value = document.querySelector("#chartWindow"+selectedWindowID).innerText;
}

function changeWindowContent() {
    const text = changeInput.value;
    document.querySelector("#chartWindow"+selectedWindowID).innerText = text;
    document.querySelector(".change-form").style.display = "none";
}

function addConnection() {
    const from = document.querySelector("#chartWindow" + selectedWindowID);
    const to = document.querySelector("#chartWindow" + addConnectionInput.value);
    instance.connect({uuids: ["chartWindow" + selectedWindowID + "-bottom",
        "chartWindow" + addConnectionInput.value + "-top" ], overlays: overlays});
    addConnectionInput.value = "";
}

function getArrowText(connection) {
    console.log(connection);
    console.log(connection.component.sourceId + " -> " + connection.component.targetId);;
    return "hey";
}

jsPlumb.ready(function () {
    var onClick = function (event) {
        console.log(event);
        showChangePanel( event.target.id.slice(11) );
    };
    [...document.querySelectorAll(".window")].forEach(x => x.addEventListener("click", onClick));

    var newWindow = document.createElement("div");
    newWindow.classList.add("window");
    newWindow.id = "chartWindow10";
    newWindow.innerText = "window ten";
    document.querySelector(".chart-demo").appendChild(newWindow);
    //document.querySelector(".chart-demo").innerHTML += "<div class=\"window\" id=\"chartWindow10\">window ten</div>"
});