// v1.2 Detailed instructions; users can choose their own questions
// v1.1 All data/user input stored in arrays
// v1.0 All data/user input stored in variables

// Introduce the game and request user names
alert('In this game, one user will provide a number of questions/answers while the second user will guess the answers to these questions.');
var user1 = prompt('Who will provide the questions/answers?');
var user2 = prompt('Who will be guessing?');
var understood = 'no';

// Present insructions to users
while (understood.toLowerCase() !== 'yes') {
  understood = prompt('Welcome ' + user1 + ' and ' + user2 + '! Please read the following instructions.\n\nInstructions for ' + user1 + ':\n\n1. To begin, enter a Yes/No question of your choice.\n2. At the next prompt, provide the Yes/No answer to your question.\n3. Also input a response to correct the guesser if they are wrong.\n4.  Enter done when finished entering all questions/answers.\n\nInstructions for ' + user2 + ':\n\n1. When prompted, the questions provided by ' + user1 + ' will be shown to you, one by one.  Answer to the best of your ability.\n\nDo you both understand?');
}

var questions = []; // stores questions
var answers = [];   // stores answers
var responses = []; // stores responses

// User #1 inputs questions/answers until entering the word 'done'
do {
  questions.push(prompt('Please enter a question. Or type done if you are finished.'));
  var temp = questions.length;

  // Leaves the loop when user inputs the word 'done'
  if (questions[temp-1].toLowerCase() === 'done') {
    questions.pop();
    break;
  }

  answers.push(prompt('Please enter your answer.'));
  responses.push(prompt('Please enter a response in the event of an incorrect answer.'));
} while (questions[temp] !== 'done');

// If no questions were provided, alert user the game is over!
if (questions.length === 0) {
  alert('Sorry, ' + user2 + '! ' + user1 + ' did not provide any questions for you!');
}

// Otherwise, user #2 begins guessing.
else {
  understood = 'no';
  while (understood.toLowerCase() !== 'yes') {
    understood = prompt('Ok, time for ' + user2 + ' to guess! Ready?');
  }

  var q = [];       // stores the user's guesses
  var correct = 0;  // counts number of correct guesses

  // Guessing game begins here
  for (var i = 0; i < questions.length; i++) {

    // Ask each question and store each user input
    q[i] = prompt('Question #' + (i+1) + ': ' + questions[i]);
    // If user guessed right, alert them they are correct
    if (q[i].toLowerCase() === answers[i]) {
      alert('You are correct!');
      correct++;
    }
    // If user guessed wrong, provide the correct response
    else {alert(responses[i]);}
  }

  // Tells user the number of correct answers
  alert('You answered ' + correct + ' questions correctly out of ' + questions.length + ' total questions.');

  // Provides user feedback based on their guessing success rate
  if (correct/questions.length > 0.80) {
    alert('You are a pretty good guesser!');
  }
  else if (correct/questions.length < 0.80) {
    alert('You need to work on your guessing!');
  }
}
