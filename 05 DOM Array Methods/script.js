const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let  data = [];
getRandomUser();
getRandomUser();




 async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api/');
      const data = await res.json();
  const user = data.results[0];

  const newUser= {
    name : `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser);
}
function doubleMoney(){
    data = data.map( (user) => {
      return {...user, money: user.money * 2};
      
    });
    updateDOM();
}

function sortByRiches() {
  data.sort((a,b) => b.money - a.money);
  updateDOM();
}

function showMillioaires(){
  data = data.filter( item => {return item.money >  1000000});
  updateDOM();
}

function calculateWealth(){
  const wealth = data.reduce((acc,user) => (acc += user.money), 0);

  const wealthEL = document.createElement('div');
  wealthEL.innerHTML = `<h3> Total Wealth: <strong> ${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEL);
}
function addData(obj){
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data){
    main.innerHTML = '<h2><strong>Preson</strong> Wealth</h2>';
    providedData.forEach(item => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
      main.appendChild(element);
    });
}

function formatMoney(number){
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click' , doubleMoney);
sortBtn.addEventListener('click' , sortByRiches);
showMillionairesBtn.addEventListener('click', showMillioaires);
calculateWealthBtn.addEventListener('click',calculateWealth );