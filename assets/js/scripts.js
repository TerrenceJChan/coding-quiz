var mainMenuFile = "./assets/includes/main-menu.html";
var quizFile = "./assets/includes/quiz.html";
var quizQuestions = null;
var questionKey = 0;
var countdown = 999;

// Loads JSON
function loadJSON(file) {
    fetch(file)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            quizQuestions = data;
        })
}

// Reads html files and populates the main section on the webpage.
function mainPopulate(file, callback) {
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
    mainPopulate(quizFile, quizPopulate);

    let timer = setInterval(function () {
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

    for (i = 0; i < 4; i++) {
        document.getElementById('a' + i).innerHTML = quizQuestions[questionKey].answers[i][0];
        document.getElementById('a' + i).setAttribute('value', false);
    }
}

function checkTrue(truth) {
    if (truth === true) {
        document.getElementById('correct').innerHTML = "Correct! Well done!";
    } else {
        document.getElementById('incorrect').innerHTML = "Incorrect! 15 seconds deducted.";
        countdown = countdown - 15;
    }

    let messageCountdown = 4;
    let clearMessage = setInterval(function () {
        messageCountdown = messageCountdown - 1;
        if (messageCountdown === 0) {
            document.getElementById('correct').innerHTML = "";
            document.getElementById('incorrect').innerHTML = "";
            clearInterval(messageCountdown);
        }
    }, 1000);
}