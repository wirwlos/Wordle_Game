import { randomWords } from './data.js';

const wordWas = document.querySelector('.wordWas');
const newGameBtn = document.getElementById('newGame');
const word = document.querySelectorAll('.guess-word');
const input = document.getElementById('guess-input');
const submit = document.getElementById('submit-button');
let winnerWord = randomWords[Math.floor(Math.random() * randomWords.length)];
let winnerWordSplit = winnerWord.toUpperCase().split('');
let guessCount = 0;

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit.click();
    }
});
console.log(winnerWord)
submit.addEventListener('click', function() {
  if (guessCount >= 5) {
    wordWas.classList.add('active');
    wordWas.textContent = `The Word Was: ${winnerWord.toUpperCase()}`;
  }

  const inputText = input.value.toUpperCase();
  const letters = inputText.split('');

  letters.forEach((letter, i) => {
    const currentLetter = word[guessCount].children[i];
    currentLetter.textContent = '';
    currentLetter.style.opacity = 0;
    setTimeout(() => {
      currentLetter.textContent = letter;
      currentLetter.style.opacity = 1;
      if (winnerWordSplit.includes(letter) && letter !== winnerWordSplit[i]) {
        currentLetter.style.backgroundColor = 'goldenrod';
      }
  
      if (letter === winnerWordSplit[i]) {
        currentLetter.style.backgroundColor = '#00b894';
      }
    }, i * 500);
    


  });

  guessCount++;
  input.value = '';
});

function newGame() {
  wordWas.classList.remove('active');
  wordWas.textContent=''
  input.value = '';
  guessCount = 0;

  word.forEach(guess => {
    const boxes = guess.querySelectorAll('.guess-box');

    boxes.forEach(box => {
      box.textContent = '';
      box.style.backgroundColor = 'gray';
    });
  });

  winnerWord = randomWords[Math.floor(Math.random() * randomWords.length)];
  winnerWordSplit = winnerWord.toUpperCase().split('');
}

newGameBtn.addEventListener('click', newGame);
