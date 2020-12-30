var mainMenuFile = "./assets/includes/main-menu.html";
var quizFile = "./assets/includes/quiz.html";
var quizQuestions = null;
var questionKey = null;

// Reads html files and populates the main section on the webpage.
var mainPopulate = function (file) {
    fetch(file)
        .then(function (resp) {
            return resp.text();
        })
        .then(function (data) {
            document.getElementById('main').innerHTML = data;
        })
}

// Reads JSON files.

mainPopulate(mainMenuFile);
var loadJSON = function (file) {
    fetch(file)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            quizQestions = data;
        })
}

// Quiz populate and countdown.
var quiz = function () {
    let countdown = 15;
    mainPopulate(quizFile);

    var timer = setInterval(function () {
        if (countdown == 10) {
            document.getElementById('time-remaining').style.color = "red";
        }

        if (countdown == 0) {
            clearInterval(timer);
            document.getElementById('main').innerHTML = "You've run out of time!";
        }

        document.getElementById('time-remaining').innerHTML = countdown;
        countdown--;

    }, 1000);
}

var answer = function () {
    document.addEventListener('click', event => {
        let target = event.target.id;
        alert(target);
    })
}

document.getElementById("start").style.color = "red";