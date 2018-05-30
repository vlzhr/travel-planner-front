const iataCodes = {};
const dests = {};

function makeAviasalesRequest(q, then) {
    const link = "http://autocomplete.travelpayouts.com/places2?term=" + q + "&locale=ru,en&types[]=city"
    console.log(link);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.statusText);
        } else {
            const data = JSON.parse(xhr.responseText);
            then(data);
        }
    };
    xhr.send();
}

function searchCities(q, then) {
    then = then ? then : console.log;
    makeAviasalesRequest(q, (data) => {
        then(data);
    });
}