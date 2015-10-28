// v1.1 All data/user input stored in arrays
// v1.0 All data/user input stored in variables

var understood = 'no';
while (understood.toLowerCase() !== 'yes') {
  understood = prompt('In this game, you will be asked three Yes/No questions.  Answer Yes or No!  Do you understand?');
}
// Counter for correct answers
var correct = 0;
// Array to store user answers to questions
var q = [];
// Array to store pre-defined questions
var prompts = ['Am I older than 30 years old?', 'Was I born in Seattle?','Have I lived outside of the U.S.?'];
// Array to store responses to incorrect answers
var wrong = ['Actually, I am older than 30!', 'Actually, I was born in Boston!','Actually, I lived in Taiwan for three years!'];
// Array to store the correct answers
var answers = ['yes', 'no', 'yes'];

// loop to cycle through the questions/system responses
for (var i = 0; i < prompts.length; i++) {
  q[i] = prompt('Question #' + (i+1) + ': ' + prompts[i]);
  if (q[i].toLowerCase() === answers[i]) {
    alert('You are correct!');
    correct++;
  }
  else {alert(wrong[i]);}
}
// Alerts user to the number of correct answers
alert('You answered ' + correct + ' questions correctly.');
