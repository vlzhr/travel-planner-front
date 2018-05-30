function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function makeRequest(args, then) {
    const link = "http://t.vkbc.ru/" + args;
    console.log(link);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return "loser";

        if (xhr.status !== 200) {
            console.log(xhr.statusText);
        } else {
            data = JSON.parse(xhr.responseText)['response'];
            then(data);
        }
    };
    xhr.send();
}