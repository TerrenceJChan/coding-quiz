var mainMenuFile = "./assets/includes/main-menu.html";
var quizFile = "./assets/includes/quiz.html";
var endFile = "./assets/includes/end.html"
var hiscoreFile = "./assets/includes/hiscores.html";
var quizQuestions = null;
var questionKey = 0;
var answersCorrect = 0;
var answersIncorrect = 0;
var countdown = 90;
var countdownStopper = false;
var hiscore = [];

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
if (localStorage.getItem('score') == null) {
    let initializeArray = [];
    localStorage.setItem('score', JSON.stringify(initializeArray));
}

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
}

var endScreen = function () {
    document.getElementById('correct').style.color = "green";
    document.getElementById('correct').innerText = answersCorrect;
    document.getElementById('incorrect').style.color = "red";
    document.getElementById('incorrect').innerText = answersIncorrect;
    document.getElementById('name').style.resize = "none";
    document.getElementById('skip').addEventListener('click', function () {
        location.reload();
    })
}

function submitScore() {
    hiscore.push(document.getElementById('name').value);
    hiscore.push(answersCorrect);
    hiscore.push(answersIncorrect);
    mainPopulate(hiscoreFile, hiscorePopulate);
}

var hiscorePopulate = function () {
    let scoreLocal = localStorage.getItem('score');
    scoreLocal = JSON.parse(scoreLocal);
    scoreLocal.push(hiscore);

    const tableDiv = document.getElementById('score-table').getElementsByTagName('tbody')[0];

    for (i = 0; i < scoreLocal.length; i++) {
        let row = tableDiv.insertRow(-1);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);

        cell1.innerText = scoreLocal[i][0];
        cell2.innerText = scoreLocal[i][1];
        cell3.innerText = scoreLocal[i][2];
    }



    localStorage.setItem('score', JSON.stringify(scoreLocal));
}