// v1.4 Add numeric question/answer
// v1.3 Summarizes user results; more personalized results; added error correction
// v1.2 Detailed instructions; users can choose their own questions
// v1.1 All data/user input stored in arrays
// v1.0 All data/user input stored in variables

// Determines whether input is in appropriate form
function yesOrNo (str) {
  var z = str.toLowerCase();
  if (z === 'yes' || z === 'no' || z === 'y' || z === 'n') {return true;}
  else {return false;}
}

// Translates single letter responses into full words
function answerChange (str) {
  if (str === 'y' || str === 'Y') {return 'yes';}
  else if (str === 'n' || str === 'N') {return 'no';}
  else {return str;}
}

// INTRODUCE GAME AND REQUEST USER NAMES
var user1 = prompt("In this game, Player 1 will provide questions/answers for Player 2 to answer.  Please enter Player 1's name now:");
var user2 = prompt("Great! Now, enter Player 2's name:");

// DECLARE VARIABLES
var questions = [];                 // Store Player 1's questions
var qType = [];                     // Keep track of the type of question (1: y/n, 2: #)
var answers = [];                   // Store Player 1's answers
var responses = [];                 // Store Player 1's responses
var guesses = [];                   // Store Player 2's guesses
var results = [];                   // Store Player 2's scores (correct/incorrect)
var score = 0;                      // Count number of Player 2's correct guesses
var summary = "Let's see how you did!\n\n";                   // String to display summary of results

// PLAYER 1 PROVIDES QUESTIONS/ANSWERS/RESPONSES
do {
  var size = questions.length;
  qType.push(prompt("Enter '1' if you would like to enter a yes/no question.\nEnter '2' if you would like to enter a question with a numeric answer."));
  while(qType[qType.length-1] !== '1' && qType[qType.length-1] !== '2') {
    qType.pop();
    qType.push(prompt("Sorry, that is not an option.  Enter '1' if you would like to enter a yes/no question.\nEnter '2' if you would like to enter a question with a numeric answer."));
  }
  questions.push(prompt(user1 + ', make sure ' + user2 + ' is not looking, then enter question #' + (size+1) + '. Or type done if you are finished.'));
  var temp = questions.length;
  // Leaves the loop when user inputs the word 'done'
  if (questions[temp-1].toLowerCase() === 'done') {
    questions.pop();
    break;
  }
  var x = prompt('Please enter the correct answer');
  while (!yesOrNo(answerChange(x))) {
    x = prompt('Please re-enter your answer.  Only Yes/No answers are accepted.');
  }

  answers.push(answerChange(x).toLowerCase());
  responses.push(prompt('Please enter your detailed answer.'));
} while (questions[temp] !== 'done');


// PLAYER 2 BEGINS GUESSING GAME HERE
// If no questions were provided, alert user the game is over!
if (questions.length === 0) {
  alert('Sorry, ' + user2 + '! ' + user1 + ' did not provide any questions for you!');
}
else {
  var understood = 'no';
  while (understood.toLowerCase() !== 'yes' && understood.toLowerCase() !== 'y') {
    understood = prompt('Ok, time for ' + user2 + ' to guess! Ready?');
    while (!yesOrNo(understood)) {
      understood = prompt('Please re-enter your answer.  Only Yes/No answers are accepted.');
    }
  }
  for (var i = 0; i < questions.length; i++) {
    // Ask each question and store each user input
    guesses[i] = answerChange(prompt('Question #' + (i+1) + ': ' + questions[i]));
    while (!yesOrNo(guesses[i])) {
      guesses[i] = prompt('Please re-enter your answer.  Only Yes/No answers are accepted.\n\nQuestion #' + (i+1) + ': ' + questions[i]);
    }
    // If user guessed right, alert them they are correct
    if (guesses[i].toLowerCase() === answers[i]) {
      alert('You are correct, ' + user2 + '! ' + responses[i]);
      results.push('o');
      score++;
    }
    // If user guessed wrong, provide the correct response
    else {
      alert('Sorry, ' + user1 + '! ' + responses[i]);
      results.push('x');
    }
  }
  for (var j = 0; j < results.length; j++) {
    if (results[j] === 'o') {
      summary = summary + 'In response to Question #' + (j+1) + ': ' + questions[j] + ' you correctly answered: ' + guesses[j].toLowerCase() + '\n';
    }
    else {
      summary = summary + 'In response to Question #' + (j+1) + ': ' + questions[j] + ' you incorrectly answered: ' + guesses[j].toLowerCase() + '\n';
    }
  }
  var ratio = score/questions.length;
  summary += '\n\nYou answered ' + score + ' questions correctly out of ' + questions.length + ' total questions (' + (ratio*100) + '%). ';
  if (ratio >= 0.60) {summary += 'You are a pretty good guesser!';}
  else {summary += 'You need to work on your guessing!';}
  alert(summary);
}

alert("Let's play a bonus round! Player 1 will now enter questions that have a numeric answer.  Let's begin!");
