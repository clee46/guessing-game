// v1.5 Moved logic into functions, added summary, user names to the DOM
// v1.4 Add numeric question/answer with error check
// v1.3 Summarizes user results; more personalized results; added error correction
// v1.2 Detailed instructions; users can choose their own questions
// v1.1 All data/user input stored in arrays
// v1.0 All data/user input stored in variables

// Called when user selects 1 from menu, allows user to enter a y/n question
function yesNo () {
    questions.push(prompt(user1 + ', make sure ' + user2 + ' is not looking, then enter question #' + (questions.length+1) + '.'));

    var temp = questions.length;
    var x = prompt('Please enter the correct answer');
    while (!yesOrNo(answerChange(x))) {
      x = prompt('Please re-enter your answer.  Only Yes/No answers are accepted.');
    }
    answers.push(answerChange(x).toLowerCase());
    responses.push(prompt('Please enter your detailed answer.'));
}

// Called when user selects 2 from menu, allows user to enter a number question
function numericFunc () {
    questions.push(prompt(user1 + ', make sure ' + user2 + ' is not looking, then enter question #' + (questions.length+1) + '.'));
    var x = parseInt(prompt('Please enter the correct answer'));
    while (!x) {
      if (x === 0) {break;}
      x = prompt('Please re-enter your answer.  Only numeric answers are accepted.');
    }
    answers.push(parseInt(x));
    responses.push(parseInt(x));
}

// Called when user enters invalid menu option
function invalidTest () {
    qType.pop();
    qType.push(prompt("Sorry, that is not an option.  Enter '1' if you would like to enter a yes/no question.\nEnter '2' if you would like to enter a question with a numeric answer.\nEnter '3' if you are finished entering questions."));
}

// Determines whether input is in appropriate form
function yesOrNo (str) {
  var z = str.toLowerCase();
  if (z === 'yes' || z === 'no' || z === 'y' || z === 'n') {return true;}
  else {return false;}
}

// Translates single letter response into full words (standardizes responses)
function answerChange (str) {
  if (str === 'y' || str === 'Y') {return 'yes';}
  else if (str === 'n' || str === 'N') {return 'no';}
  else {return str;}
}

function readyToPlay () {
  var understood = 'no';
  while (understood.toLowerCase() !== 'yes' && understood.toLowerCase() !== 'y') {
    understood = prompt('Ok, time for ' + user2 + ' to guess! Ready?');
    while (!yesOrNo(understood)) {
      understood = prompt('Please re-enter your answer.  Only Yes/No answers are accepted.');
    }
  }
}

function answerYesNo () {
  // Ask each question and store each user input
  guesses[i] = answerChange(prompt('Question #' + (i+1) + ': ' + questions[i] + ' Answer Yes/No'));
  while (!yesOrNo(guesses[i])) {
    guesses[i] = answerChange(prompt('Please re-enter your answer.  Only Yes/No answers are accepted.\n\nQuestion #' + (i+1) + ': ' + questions[i]));
  }
  // If user guessed right, alert them they are correct
  if (guesses[i].toLowerCase() === answers[i]) {
    alert('You are correct, ' + user2 + '! ' + responses[i]);
    results.push('o');    // store that player guessed right
    score++;
  }
  // If user guessed wrong, provide the correct response
  else {
    alert('Sorry, ' + user1 + '! ' + responses[i]);
    results.push('x');    // store that player guessed wrong
  }
}

function numAnswer () {
  var numArray = [];    // to store all the number guesses
  var current = parseInt(prompt('Question #' + (i+1) + ': ' + questions[i] + ' Guess a number.'));
  while (!current) {
    current = parseInt(prompt('Please enter a numeric answer.\n\nQuestion #' + (i+1) + ': ' + questions[i]));
  }
  while(current !== answers[i]) {
    numArray.push(current);    // store the guess
    if (current > answers[i]) {
      current = parseInt(prompt('Your guess was too high. Please enter a numeric answer.\n\nQuestion #' + (i+1) + ': ' + questions[i]));
      while (!current) {
        if (current === 0) {break;}
        current = parseInt(prompt('That is not a number. Please enter a number.\n\nQuestion #' + (i+1) + ': ' + questions[i]));
      }
    }
    else {
      current = parseInt(prompt('Your guess was too low. Please enter a numeric answer.\n\nQuestion #' + (i+1) + ': ' + questions[i]));
      while (!current) {
        if (current === 0) {break;}
        current = parseInt(prompt('That is not a number. Please enter a number.\n\nQuestion #' + (i+1) + ': ' + questions[i]));
      }
    }
  }
  results.push('o');                // placeholder (ensures indices remain accurate)
  responses.push('1');              // placeholder (ensures indices remain accurate)
  alert(current + ' is correct!');
  guesses.push(numArray);           // stores all the guesses
}

function summarize () {
  // Prepare the summary results
  for (var j = 0; j < questions.length; j++) {
    if (qType[j] === '1') {
      if (results[j] === 'o') {
        summary = summary + '<br />In response to Question #' + (j+1) + ': ' + questions[j] + ' you correctly answered: ' + guesses[j].toLowerCase();
      }
      else {
        summary = summary + '<br />In response to Question #' + (j+1) + ': ' + questions[j] + ' you incorrectly answered: ' + guesses[j].toLowerCase();
      }
    }
    else {
      summary += '<br />In response to Question #' + (j+1) + ': ' + questions[j];
      if (guesses[j].length === 0) {
        summary += ' you correctly guessed ' + answers[j] + ' on the first try!';
      }
      else if (guesses[j].length === 1) {
        summary += ' you guessed ' + guesses[j] + ' before correctly guessing ' + answers[j];
      }
      else {
        summary += ' you made the following guesses: ' + guesses[j] + ' before correctly guessing ' + answers[j];
      }
    }
  }
}

// INTRODUCE GAME AND REQUEST USER NAMES, PASSES NAMES TO DOM
var user1 = prompt("In this game, Player 1 will provide questions/answers for Player 2 to answer.  Please enter Player 1's name now:");
var user2 = prompt("Great! Now, enter Player 2's name:");
var play1 = document.getElementById('player1');
var play2 = document.getElementById('player2');
play1.innerHTML = 'Player 1: ' + user1;
play2.innerHTML = 'Player 2: ' + user2;

// DECLARE GLOBAL VARIABLES
var questions = [];                 // Store Player 1's questions
var qType = [];                     // Keep track of the type of question (1: y/n, 2: #)
var answers = [];                   // Store Player 1's answers
var responses = [];                 // Store Player 1's responses (for y/n questions only)
var guesses = [];                   // Store Player 2's guesses
var results = [];                   // Store Player 2's scores (correct/incorrect)
var score = 0;                      // Count number of Player 2's correct guesses
var summary = "Let's see how you did!<br />";                   // String to display summary of results

// GAME BEGINS HERE
// PLAYER 1 ENTERS QUESTIONS/ANSWERS
do {
  qType.push(prompt("Enter '1' if you would like to enter a yes/no question.\nEnter '2' if you would like to enter a question with a numeric answer.\nEnter '3' if you are finished entering questions."));

  if (qType[qType.length-1] === '1') {yesNo();}               // y/n questions
  else if (qType[qType.length-1] === '2') {numericFunc();}    // number questions
  else if (qType[qType.length-1] === '3') {                   // exit
    qType.pop();
    break;
  }
  else {invalidTest();}                                       // invalid input
} while (qType[qType.length-1] !== '3');

// PLAYER 2 BEGINS GUESSING GAME HERE
if (questions.length === 0) {
  alert('Sorry, ' + user2 + '! ' + user1 + ' did not provide any questions for you!');
}
else {
  readyToPlay();  // proceed only when player 2 is ready
  for (var i = 0; i < questions.length; i++) {
    // YES/NO QUESTION
    if (qType[i] === '1') {
      answerYesNo();
    }
    // NUMERIC QUESTION
    else {
      numAnswer();
    }
  }
  summarize();
  var image = "../img/codefellows.png";
  var sum = document.getElementById('summary1');
  sum.innerHTML = '' + summary + '<br><img width:"300" src="' + image + '">';       // Display the summary results
  sum.className = 'fellows';

}

