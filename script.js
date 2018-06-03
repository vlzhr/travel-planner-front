const size = 800;
const offset = 20;

const interval = 4;
let run;
let name;
let items;
let win_n;

loadItems().then(function(val) {
    items = val.items;
    if (val.already) {
        alreadyMessage(val.already);
        return;
    }
    loadWin().then(function(val) {
        win_n = val;
        afterPromises(items, win_n);
    })
});

function closeRules() {
    rulesMessage.style.display = "none";
}

const rulesMessage = document.createElement("div");
rulesMessage.classList.add("rules-message");
rulesMessage.innerHTML = "<p>Нажмите на кнопку Go, чтобы крутить указатель, а затем выберите удачный момент и нажмите на стрелку: она остановится на призе, который Вам достнется!</p><p>Желаем удачи.</p>";
const rulesCloser = document.createElement("div");
rulesCloser.classList.add("rules-closer");
rulesMessage.appendChild(rulesCloser);
const closeText = document.createElement("div");
closeText.classList.add("close-text");
closeText.innerText = "Ясно! Поехали";
rulesMessage.appendChild(closeText);
rulesMessage.addEventListener("click", closeRules);
closeText.addEventListener("click", closeRules);

const rulesMessage1 = document.createElement("div");
rulesMessage1.classList.add("rules-message");
rulesMessage1.innerHTML = "<p>Поздравляем с выигрышем!</p><p>Чтобы забрать приз, напишите организатору.</p>";
const rulesCloser1 = document.createElement("div");
rulesCloser1.classList.add("rules-closer");
rulesMessage1.appendChild(rulesCloser1);
// const closeText1 = document.createElement("div");
// closeText1.classList.add("close-text");
// closeText1.innerText = "Ясно! Поехали";
//rulesMessage1.appendChild(closeText);
rulesMessage1.addEventListener("click", closeRules);
// closeText1.addEventListener("click", closeRules);


function afterPromises (items, win_n) {
    const items_n = win_n;

    const playground = document.querySelector("#playground");
    for (const item_n in items) {
        console.log(item_n);
        const el = to_element(item_n);
        playground.appendChild(el);
    }
    playground.innerHTML += '<div id="runner" onclick="run()"></div>';
    playground.appendChild(rulesMessage);

    const roulette = document.querySelector("#roulette");
    roulette.onclick = function() {
        document.documentElement.style.setProperty('--clickOn', getRotationVal() + "deg");
        roulette.classList.remove("spinning");
        roulette.classList.add("finishing");

        window.setTimeout(function () {
            document.querySelectorAll(".item")[items_n].classList.add("wins");

            window.setTimeout(function () {
                /*document.querySelector(".win-message").innerHTML = "<span class='mes'>Вы выиграли этот приз! Напишите организатору, чтобы забрать его.</span>"
                document.querySelector(".win-message").style.display = "block";*/
                playground.appendChild(rulesMessage1);
            }, 2000);
        }, interval * 1000 + 1000);
    };

    run = function() {
        roulette.style.display = "block";
        document.querySelector("#runner").style.display = "none";
        console.log(items_n);
        document.documentElement.style.setProperty('--spin', /*3600 + 180 +*/540 + 360 * (+items_n / items.length) + "deg", "important");
        roulette.classList.add("spinning");
    };


    // document.documentElement.style.setProperty('--spin', 3600 + Math.random() * 1080 + "deg", "important");
    document.documentElement.style.setProperty('--interval', interval + "s");

}

function alreadyMessage(val) {
    const message = document.createElement("div.already-message");
    message.innerHTML = "Напишите организатору, чтобы забрать приз. Вы уже выиграли: <br><br><img src='" + val + "' alt='выигрыш'>";
    try {
        document.querySelector("p").remove();
    } catch (e) {
        console.log("already");
    }
    document.querySelector("#playground").querySelector("#roulette-container").remove();
    document.querySelector("#playground").appendChild(message);

}


function getRotationVal() {
    const el = document.getElementById("roulette");

    const st = window.getComputedStyle(el, null);

    const tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform")

    var values = tr.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var scale = Math.sqrt(a*a + b*b);

// arc sin, convert from radians to degrees, round
// DO NOT USE: see update below
    var sin = b/scale;
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    return angle;
}