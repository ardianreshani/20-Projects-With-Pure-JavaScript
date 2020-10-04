const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const  resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');




function searchMeal(e){
  e.preventDefault();

  single_mealEl.innerHTML = ``;
  const term = search.value;

  if ( term.trim()){
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then( res => res.json())
      .then ( data => {
        resultHeading.innerHTML = ` <h2> Search results for '${term}': </h2>`;
        if(data.meals === null){
          resultHeading.innerHTML = ` <h2> There are no search results of '${term}' Try again!: </h2>`;
        }else{
          mealsEl.innerHTML = data.meals.map(meal => `
          <div class="meal">
            <img src=" ${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}"> 
              <h3> ${meal.strMeal}</h3>
            </div>
          </div>
          `)
          .join('');
        }
      })
      search.value = '';
  }else{
   
  }
}
// find meal by id 
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then( res => res.json())
  .then( data => { 
    const meal = data.meals[0];

    addMealToDom(meal);
  });
}

function randomMeal(){
  mealsEl.innerHTML= '';
  resultHeading.innerHTML = '';
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').then( res => res.json()).then(data=> {
    const meal = data.meals[0];

    addMealToDom(meal);
  })
}

// add meal to dom  

function addMealToDom(meal){
  const  ingredients = [];

  for(let i = 1; i <=20; i++){
    if(meal[`strIngredient${i}`]){
    ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
  }else {
    break;
  }
  }
  single_mealEl.innerHTML = `
    <div class="single-meal" id="close"> 
      <h1>${meal.strMeal} </h1>
      <img src=" ${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="singele-meal-info"> 
        ${meal.strCategory ? `<p> <b>Category:</b> ${meal.strCategory }</p>`: ''}
        ${meal.strArea ? `<p><b> Country: </b> ${meal.strArea }</p>`: ''}
      </div>
      <div class="meain">
        <p>${meal.strInstructions} </p>
        <h2>Ingredients </h2>
        <ul> 
          ${ingredients.map( ing => `<li>${ing} </li>`).join('')}
        </ul>
      </p>
    </div>
  `
}
window.addEventListener('click', () => {
  single_mealEl.innerHTML = ``;
  search.value = '';
} )
submit.addEventListener('click', searchMeal);
random.addEventListener('click', randomMeal);
mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
      if (item.classList){
        return item.classList.contains('meal-info');
      }else {
        return false;
      }
  })
  if( mealInfo){
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
}) 