# JavaScript Coding Quiz
**UofT Coding Bootcamp Week 4 Challenge - Coding Quiz**  
🔗 [Link to deployment page](https://terrencejchan.github.io/coding-quiz/)  
  
![Demo of app](./screenshots/demo.gif "Gif of coding quiz.")

This app gives the user a multiple-choice quiz to test their knowledge on JavaScript. It also allows them to save their high-scores that persists between sessions, so that they may see how they, or other users performed in the past.

## Logic
The page first loads the index.html file, which contains an empty \<main> section. This space is often populated by different html files that would contain the main-menu, quiz, and high-scores screen.

### Quiz
Starting the quiz starts a 90 second countdown timer. Each question has four possible answers to choose from. Each question and their associated answers are loaded in from a JSON file that holds information that populates the \<main> section. Because of this, many more questions and answers could be loaded in through an expanded JSON file if desired.

Selecting the correct answer will give a green message that says correct, and populates the next question. An incorrect question will present a message in red as well as deducting 15 seconds from the overall timer.

### End Screen (Score Screen)
Once the quiz is completed, or the timer runs out, the user is presented with a screen that tells them how many questions they answered correctly and incorrectly. They may then enter their initials to be saved to the high-scores table, or to skip this and reload the quiz.

The textbox has error-handling that only accepts a value that is two characters long, and must consist of upper and/or lower alphabetical characters.

### High-Scores
Saving the score from the end screen will push the score to localStorage.

The JavaScript for the high-scores converts information into a stringified array that populates the screen.

So long as the localStorage is not purged, the high-scores screen will list the scores from latest to soonest scores.