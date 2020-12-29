var mainMenuFile = "./assets/includes/main-menu.html";
var quizFile = "./assets/includes/quiz.html";

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

mainPopulate(mainMenuFile);

// Quiz logic.
var quiz = function () {
    let countdown = 15;
    mainPopulate(quizFile);
    var timer = setInterval(function () {
        
        if (countdown <= 10) {
            document.getElementById('time-remaining').style.color = "red";
        }

        document.getElementById('time-remaining').innerHTML = countdown;
        countdown--;

        if (countdown == -1) {
            clearInterval(timer);
            document.getElementById('main').innerHTML = "You've run out of time!";
        }
    }, 1000);
}