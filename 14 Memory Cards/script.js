const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const curremtEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEL = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keepp track of current card 
let currentActiveCard = 0;
const cardsData = getCardsData();
const cardEl = [];

// const cardsData = [ 
//   { question: 'What is your Name', 
//     answer: 'Im Ardian'},
//     { question: 'What is a variable', 
//     answer: 'A Container for a piece of data'},
//     { question: 'Example of Case Sensitive Variable', 
//     answer: 'thisIsAVariable'},
// ];

function createCards(){
  cardsData.forEach((data, index) => createCard(data, index));

}

function createCard(data,index){
    const card = document.createElement('div');
    card.classList.add('card');

    if(index === 0){
      card.classList.add('active');
    }
    card.innerHTML= `
    <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
  </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    cardEl.push(card);

    cardsContainer.appendChild(card);
    updateCurrentText();
}

function updateCurrentText(){
  curremtEl.innerHTML = `${currentActiveCard +1}/${cardEl.length}`;
}
 // get cards local strois 
 function getCardsData(){
   const cards =JSON.parse(localStorage.getItem('cards'));
   return cards ===  null ? [] : cards;
 }

 function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
 }
createCards();

nextBtn.addEventListener('click', () => {
  cardEl[currentActiveCard].className = 'card left';
  currentActiveCard = currentActiveCard +1;
  if (currentActiveCard > cardEl.length -1){  
      currentActiveCard = cardEl.length -1;
  }
  cardEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});
prevBtn.addEventListener('click', () => {
  cardEl[currentActiveCard].className = 'card right';
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0){  
      currentActiveCard = 0;
  }
  cardEl[currentActiveCard].className = 'card active';
  updateCurrentText();
})
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

addCardBtn.addEventListener('click',() => {
  const question = questionEl.value;
  const answer = answerEL.value;
    if(question.trim() && answer.trim()){
      const newCard = { question, answer};
      
      createCards(newCard);

      questionEl.value = '';
      answerEL.value = '';
      addContainer.classList.remove('show');
      cardsData.push(newCard);
      setCardsData(cardsData);
    }
})

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
})