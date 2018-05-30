let selectedWindowID = 0;
let projectID = getCookie("pid");
const changeForm = document.querySelector(".change-form");
const changeInput = document.querySelector(".change-form__input");
const addConnectionInput = document.querySelector(".change-form__add-connection");
const addChildInput = document.querySelector(".change-form__add-child");
const cityChoiceForm = document.querySelector(".city-choice-form");
const cityChoices = document.querySelector(".city-choice-form .variants");
const cityChoicesInsertedValue = document.querySelector(".city-choice-form .inserted-value");
let instance;
const arrowCommon = { foldback: 0.7, fill: "red", width: 14 };
let overlays =
        [[ "Arrow", { location: 0.7 }, arrowCommon ]/*,
        [ "Label", { label: getArrowText }]*/];


function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function showChangePanel( windowID ) {
    changeForm.style.display = "block";
    selectedWindowID = windowID;
    changeInput.value = document.querySelector("#chartWindow"+selectedWindowID).innerText;
}

function changeWindowContent() {

    // document.querySelector(".change-form").style.display = "none";
    searchCities(changeInput.value, (data) => showCityChoicePanel(data, changeInput.value, selectedWindowID, (city) => { changePoint(selectedWindowID, city) }));
    // changePoint(selectedWindowID, changeInput.value);
}

function addConnection() {
    instance.connect({uuids: ["chartWindow" + selectedWindowID + "-bottom",
        "chartWindow" + addConnectionInput.value + "-top" ], overlays: overlays});
    addConnectionInput.value = "";
}

function showCityChoicePanel(data, inserted, windowID, then) {
    if (inserted.toLowerCase() === data[0]["name"].toLowerCase()) {
        iataCodes[windowID] = data[0]["code"];
        newIata(windowID, data[0]["code"], function() { then(data[0]["name"]) });
    } else {
        cityChoices.innerHTML = "";
        data.forEach(x => {
            const newChoice = document.createElement("div");
            newChoice.classList.add("variant");
            newChoice.innerHTML = x["name"];
            newChoice.addEventListener("click", function () {
                cityChoiceForm.style.display = "none";
                iataCodes[windowID] = x["code"];
                newIata(windowID, x["code"], function() { then(x["name"]) });
            });
            cityChoices.appendChild(newChoice);
        });
        cityChoicesInsertedValue.innerText = inserted;
        cityChoicesInsertedValue.addEventListener("click", function() {
            cityChoiceForm.style.display = "none";
            then(inserted);
        });
        cityChoiceForm.style.display = "block";
    }
}

function addChild() {
    searchCities(addChildInput.value, (data) => showCityChoicePanel(data,  addChildInput.value, selectedWindowID, (city) => { uploadChild(selectedWindowID, city) }));
}

function delPoint() {
    removePoint(selectedWindowID);
}

let arrowsss = [];
function getArrowText(connection) {
    // console.log(connection);
    //console.log(connection.component.sourceId + " -> " + connection.component.targetId);

    arrowsss = [+connection.component.id.split("_")[connection.component.id.split("_").length - 1] + 1, connection.component.sourceId.slice(11), connection.component.targetId.slice(11)];

    return "dest loading";

}

jsPlumb.ready(function () {
    //[...document.querySelectorAll(".window")].forEach(x => x.addEventListener("click", onClick));

});





