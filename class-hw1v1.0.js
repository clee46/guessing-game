// v1.0 All data/user input stored in variables

var understood = 'no';
while (understood !== 'yes') {
  understood = prompt('In this game, you will be asked three Yes/No questions.  Answer Yes or No!  Do you understand?');
}
var correct = 0;
var answers = ['yes', 'no', 'yes'];
var q1 = prompt('Am I older than 30 years old?');
if (q1 === answers[0]) {
  alert('You are correct!');
  correct++;
}
else {alert('Actually, I am older than 30!');}
var q2 = prompt('Was I born in Seattle?');
if (q2 === answers[1]) {
  alert('You are correct!');
  correct++;
}
else {alert('Actually, I was born in Boston!');}
var q3 = prompt('Have I lived outside of the U.S.?');
if (q3 === answers[2]) {
  alert('You are correct!');
  correct++;
}
else {alert('Actually, I lived in Taiwan for 3 years!');}

alert('You answered ' + correct + ' questions correctly.');
