const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');



const figurePart = document.querySelectorAll('.figure-part');

const words = ['albaia', 'kosovo', 'programming', 'prizren'];
let   selectedWord = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWord);
const correctLetters = [];
const wrongLetters = [];

function displayWord(){
    wordEl.innerHTML= ` ${selectedWord.split('')
    .map( letter => `<span class="letter">
      ${correctLetters.includes(letter) ? letter : ''}
    </span>`).join('') } `;
    const innerWord = wordEl.innerText.replace(/\n/g, '');

 if (innerWord === selectedWord){
   finalMessage.innerText='Congratulations! You Won! 😄';
   popup.style.display= 'flex';
 }
}
function updateWrongLettersEl() {
 wrongLettersEl.innerHTML = ` 
 ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
 ${ wrongLetters.map( letter => `<span>${letter} </span>`)}
 `;

  figurePart.forEach((part, index) => {
   const error = wrongLetters.length;
   if(index < error){
     part.style.display = 'block';
   }else {
    part.style.display = 'none';
   }
 });

 if(wrongLetters.length === figurePart.length){
   finalMessage.innerText= "Unfortunately you lost. 😟";
   popup.style.display = 'flex';
 }
};
function showNotification() {
  notification.classList.add('show');

  setTimeout( () => {
    notification.classList.remove('show')
  }, 3000);
}

// letters press
window.addEventListener('keydown', e => {
   if(e.keyCode >= 65 && e.keyCode <= 90){
     const letter = e.key;
     if( selectedWord.includes(letter)){
       if(!correctLetters.includes(letter)){
         correctLetters.push(letter);
         displayWord();
       } else {
         showNotification();
       }
     }else {
       if(!wrongLetters.includes(letter)){
         wrongLetters.push(letter);
         updateWrongLettersEl();
       }else {
        showNotification();
       }
     }
   }
});

// Restart the game
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
})
displayWord();