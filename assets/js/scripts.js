var mainMenuFile = "./assets/includes/main-menu.html";
var quizFile = "./assets/includes/quiz.html";
var quizQuestions = null;
var questionKey = 0;

// Loads JSON
var loadJSON = function (file) {
    fetch(file)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            quizQuestions = data;
        })
}

// Reads html files and populates the main section on the webpage.
var mainPopulate = function (file, callback) {
    fetch(file)
        .then(function (resp) {
            return resp.text();
        })
        .then(function (data) {
            document.getElementById('main').innerHTML = data;

            if (callback !== null) {
                callback();
            }
        })
}

// Initialization
loadJSON("./assets/json/quiz.json");
mainPopulate(mainMenuFile, null);

// Quiz populate and countdown.
var quiz = function () {
    let countdown = 15;
    mainPopulate(quizFile, quizPopulate);

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

var quizPopulate = function () {
    document.getElementById('question').innerHTML = quizQuestions[questionKey].question;
    document.getElementById('a1').innerHTML = quizQuestions[questionKey].answers[0][0];
    document.getElementById('a2').innerHTML = quizQuestions[questionKey].answers[1][0];
    document.getElementById('a3').innerHTML = quizQuestions[questionKey].answers[2][0];
    document.getElementById('a4').innerHTML = quizQuestions[questionKey].answers[3][0];
}

var answer = function () {
    document.addEventListener('click', event => {
        let target = event.target.id;
        alert(target);
    })
}

