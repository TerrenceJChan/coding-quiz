var mainMenuFile = "./includes/main-menu.html";

var mainPopulate = function (file) {
    fetch(file)
    .then(function (resp) {
        return resp.text();
    })
    .then(function (data) {
        document.getElementById('main').innerHTML = data;
    })
}

mainPopulate(mainMenuFile);