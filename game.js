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
  // Instructions for Player 1
  qType.push(prompt("Enter '1' if you would like to enter a yes/no question.\nEnter '2' if you would like to enter a question with a numeric answer.\nEnter '3' if you are finished entering questions."));

  // Exit the loop
  if (qType[qType.length-1] === '3') {
    qType.pop();
    break;
  }

  // Proceed with entering Yes/No questions
  if (qType[qType.length-1] === '1') {
    questions.push(prompt(user1 + ', make sure ' + user2 + ' is not looking, then enter question #' + (questions.length+1) + '.'));
    var temp = questions.length;
    var x = prompt('Please enter the correct answer');
    while (!yesOrNo(answerChange(x))) {
      x = prompt('Please re-enter your answer.  Only Yes/No answers are accepted.');
    }
    answers.push(answerChange(x).toLowerCase());
    responses.push(prompt('Please enter your detailed answer.'));
  }

  // Proceed with numeric questions
  if (qType[qType.length-1] === '2') {
    questions.push(prompt(user1 + ', make sure ' + user2 + ' is not looking, then enter question #' + (questions.length+1) + '.'));
    var x = prompt('Please enter the correct answer');
    while (!parseInt(x)) {
      x = prompt('Please re-enter your answer.  Only numeric answers are accepted.');
    }
    answers.push(parseInt(x));
    responses.push(parseInt(x));
  }

  // Invalid inputs
  while (qType[qType.length-1] !== '1' && qType[qType.length-1] !== '2' && qType[qType.length-1] !== '3') {
    qType.pop();
    qType.push(prompt("Sorry, that is not an option.  Enter '1' if you would like to enter a yes/no question.\nEnter '2' if you would like to enter a question with a numeric answer.\nEnter '3' if you are finished entering questions."));
  }
} while (qType[qType.length-1] !== '3');


// PLAYER 2 BEGINS GUESSING GAME HERE

// If no questions were provided, alert user the game is over!
if (questions.length === 0) {
  alert('Sorry, ' + user2 + '! ' + user1 + ' did not provide any questions for you!');
}
else {
  var understood = 'no';

  // Make sure Player 2 is ready to play
  while (understood.toLowerCase() !== 'yes' && understood.toLowerCase() !== 'y') {
    understood = prompt('Ok, time for ' + user2 + ' to guess! Ready?');
    while (!yesOrNo(understood)) {
      understood = prompt('Please re-enter your answer.  Only Yes/No answers are accepted.');
    }
  }

  // BEGIN ASKING QUESTIONS
  for (var i = 0; i < questions.length; i++) {
    // YES/NO QUESTION
    if (qType[i] === '1') {
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
    // NUMERIC QUESTION
    else {
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
            current = parseInt(prompt('That is not a number. Please enter a number.\n\nQuestion #' + (i+1) + ': ' + questions[i]));
          }
        }
        else {
          current = parseInt(prompt('Your guess was too low. Please enter a numeric answer.\n\nQuestion #' + (i+1) + ': ' + questions[i]));
          while (!current) {
            current = parseInt(prompt('That is not a number. Please enter a number.\n\nQuestion #' + (i+1) + ': ' + questions[i]));
          }
        }
      }
      results.push('o');    // placeholder
      responses.push('1');  // placeholder
      alert(current + ' is correct!');
      // alert('Your guesses were: ' + numArray);
      guesses.push(numArray);  // store all the guesses
      // alert('Guesses array looks like this: ' + guesses[0] + ' and ' + guesses[1]);
    }
  }

  // Prepare the summary results
  for (var j = 0; j < questions.length; j++) {
    if (qType[j] === '1') {
      if (results[j] === 'o') {
        summary = summary + 'In response to Question #' + (j+1) + ': ' + questions[j] + ' you correctly answered: ' + guesses[j].toLowerCase() + '\n';
      }
      else {
        summary = summary + 'In response to Question #' + (j+1) + ': ' + questions[j] + ' you incorrectly answered: ' + guesses[j].toLowerCase() + '\n';
      }
    }
    else {
      summary = summary + 'In response to Question #' + (j+1) + ': ' + questions[j] + ' you made the following guesses: ' + guesses[j] + ' before correctly guessing: ' + answers[j];
    }

  }
  alert(summary);
  /*
  var ratio = score/questions.length;
  summary += '\n\nYou answered ' + score + ' questions correctly out of ' + questions.length + ' total questions (' + (ratio*100) + '%). ';
  if (ratio >= 0.60) {summary += 'You are a pretty good guesser!';}
  else {summary += 'You need to work on your guessing!';}
  alert(summary);*/
}

