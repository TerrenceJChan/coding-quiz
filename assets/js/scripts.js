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
            document.getElementById('main').innerText = "You've run out of time!";
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
        document.getElementById('statement').style.color = "green";
        document.getElementById('statement').innerText = "Correct! Well done!";
    } else {
        document.getElementById('statement').style.color = "red";
        document.getElementById('statement').innerText = "Incorrect! 15 seconds deducted.";
        countdown = countdown - 15;
    }

    questionKey = questionKey + 1;
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