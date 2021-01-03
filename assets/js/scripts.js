var mainMenuFile = "./assets/includes/main-menu.html";
var quizFile = "./assets/includes/quiz.html";
var endFile = "./assets/includes/end.html"
var quizQuestions = null;
var questionKey = 0;
var answersCorrect = 0;
var answersIncorrect = 0;
var countdown = 999;
var countdownStopper = false;

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
            document.getElementById('main').innerText = "You've run out of time!";
        }

        if (countdownStopper == true) {
            clearInterval(timer);
            countdownStopper == false;
        }

        document.getElementById('time-remaining').innerText = countdown;
        countdown--;

    }, 1000);
}

var quizPopulate = function () {
    document.getElementById('question').innerText = quizQuestions[questionKey].question;

    for (i = 0; i < 4; i++) {
        document.getElementById('a' + i).innerText = quizQuestions[questionKey].answers[i][0];
        if (quizQuestions[questionKey].answers[i][1] == false) {
            document.getElementById('a' + i).setAttribute('value', false);
        } else {
            document.getElementById('a' + i).setAttribute('value', true);
        }
    }
}

function checkTrue(truth) {
    if (truth == 'true') {
        answersCorrect += 1;
        document.getElementById('statement').style.color = "green";
        document.getElementById('statement').innerText = "Correct! Well done!";
    } else {
        answersIncorrect += 1;
        document.getElementById('statement').style.color = "red";
        document.getElementById('statement').innerText = "Incorrect! 15 seconds deducted.";
        countdown = countdown - 15;
    }

    questionKey = questionKey + 1;
    if (questionKey == quizQuestions.length) {
        mainPopulate(endFile, endScreen);
        countdownStopper = true;
        questionKey = 0;
        return;
    }
    mainPopulate(quizFile, quizPopulate);

    clearMessage();
}

function clearMessage() {
    var message = setTimeout(function () {
        document.getElementById('statement').innerText = "";
    }, 4000);

    document.getElementById('a1').addEventListener('click', function () {
        alert('hey');
        clearTimeout(message);
    })
}

var endScreen = function() {
    document.getElementById('time-remaining').innerText = "∞";
    document.getElementById('correct').style.color = "green";
    document.getElementById('correct').innerText = answersCorrect;
    document.getElementById('incorrect').style.color = "red";
    document.getElementById('incorrect').innerText = answersIncorrect;
    document.getElementById('name').style.resize = "none";
}

function submitScore() {
    mainPopulate(quizFile, quizPopulate);
}