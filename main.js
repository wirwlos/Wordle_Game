//importing our data from data.js for words
import { randomWords } from './data.js';
//calling elements from HTML to manipulate them
const wordWas = document.querySelector('.wordWas');
const newGameBtn = document.getElementById('newGame');
const word = document.querySelectorAll('.guess-word');
const input = document.getElementById('guess-input');
const submit = document.getElementById('submit-button');
//calling a random value and assigning it to a variable so we have random word
let winnerWord = randomWords[Math.floor(Math.random() * randomWords.length)];
let winnerWordSplit = winnerWord.toUpperCase().split('');
let guessCount = 0;
//adding event to "Enter" button on keyboard to do as clicking on submit
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit.click();
    }
});
console.log(winnerWord)
//Adding a click event to submit button.
submit.addEventListener('click', function() {
  //if user guesses more than 5 times, it pop ups the word
  if (guessCount >= 5) {
    wordWas.classList.add('active');
    wordWas.textContent = `The Word Was: ${winnerWord.toUpperCase()}`;
  }
//take the input, uppercase it and split for check later.
  const inputText = input.value.toUpperCase();
  const letters = inputText.split('');
//looping letters of the input
  letters.forEach((letter, i) => {
    const currentLetter = word[guessCount].children[i];
    currentLetter.textContent = '';
    currentLetter.style.opacity = 0;
    //setting timeout for one-by-one entering the letters to screen
    setTimeout(() => {
      currentLetter.textContent = letter;
      currentLetter.style.opacity = 1;
      //checking if the letter is in the word but in different location
      if (winnerWordSplit.includes(letter) && letter !== winnerWordSplit[i]) {
        currentLetter.style.backgroundColor = 'goldenrod';
      }
      //checking if the letter is in the same spot as the word. 
      if (letter === winnerWordSplit[i]) {
        currentLetter.style.backgroundColor = '#00b894';
      }
      //our time scale for letters to show up
    }, i * 500);
    


  });
  //adding a guesscount
  guessCount++;
  input.value = '';
});
//new game function for clicking on new game, it starts the game again.
function newGame() {
  //removing active attribute of "Word was" class for next game and clearing the screen
  wordWas.classList.remove('active');
  wordWas.textContent=''
  input.value = '';
  guessCount = 0;
//still clearing the screen 
  word.forEach(guess => {
    const boxes = guess.querySelectorAll('.guess-box');

    boxes.forEach(box => {
      box.textContent = '';
      box.style.backgroundColor = 'gray';
    });
  });
//creating new random word
  winnerWord = randomWords[Math.floor(Math.random() * randomWords.length)];
  winnerWordSplit = winnerWord.toUpperCase().split('');
}
//on click of "new game" button, calling new game function
newGameBtn.addEventListener('click', newGame);
