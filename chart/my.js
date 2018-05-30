let selectedWindowID = 0;
const changeForm = document.querySelector(".change-form");
const changeInput = document.querySelector(".change-form__input");
const addConnectionInput = document.querySelector(".change-form__add-connection");
const addChildInput = document.querySelector(".change-form__add-child");
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
    instance.connect({uuids: ["chartWindow" + selectedWindowID + "-bottom",
        "chartWindow" + addConnectionInput.value + "-top" ], overlays: overlays});
    addConnectionInput.value = "";
}

function addChild() {
    uploadChild(selectedWindowID, addChildInput.value);
}

function delPoint() {
    removePoint(selectedWindowID);
}

function getArrowText(connection) {
    console.log(connection);
    console.log(connection.component.sourceId + " -> " + connection.component.targetId);;
    return "hey";
}

jsPlumb.ready(function () {

    //[...document.querySelectorAll(".window")].forEach(x => x.addEventListener("click", onClick));

});

