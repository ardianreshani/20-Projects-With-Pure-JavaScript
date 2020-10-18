const draggableList = document.getElementById('draggable-link');
const check = document.getElementById('check');

const richestPeople = [ 
  'Jeff Bezos',
  'Bernard Arnault',
  'Bill Gates',
  'Mark Zuckerberg',
  'Elon Musk',
  'Mukesh Ambani',
  'Warren Buffet',
  'Larry Ellison',
  'Steve Ballmer',
  'Amancio Ortega'
];
const listItems = [];
let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
  .map(a => ({value: a, sort: Math.random()}))
  .sort( (a,b) => a.sort - b.sort)
  .map(a => a.value)
  .forEach((person, index) =>{
    const listItem = document.createElement('li');
  
    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
    <span class="number">${index + 1} </span> 
    <div class="draggable" draggable="true">
    <p class="person-name">${person} </p>
    <i class="fas fa-grip-lines"> </i>
    </div>`;
    listItems.push(listItem);
    draggableList.appendChild(listItem);
    addEventListener();
  });
}
function dragStart(){
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  
}
function dragOver(e){
  e.preventDefault();
}
function swapItems(fromIndex, toIndex){
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemtwo = listItems[toIndex].querySelector('.draggable');
    listItems[fromIndex].appendChild(itemtwo);
    listItems[toIndex].appendChild(itemOne);
};

function dragDrop(){
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}
function dragEnter(){
  this.classList.add('over');
}
function dragLeave(){
  this.classList.remove('over');
}

function checkOrder(){
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();
    if(personName !== richestPeople[index]){
      listItem.classList.add('wrong');
    }else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }

  })
}
function addEventListener(){
  const draggables = document.querySelectorAll('.draggable');
  const dragListItem = document.querySelectorAll('.draggable-link li');
draggables.forEach( draggable => {
  draggable.addEventListener('dragstart', dragStart);
})
dragListItem.forEach( item => {
  item.addEventListener('dragover', dragOver);
  item.addEventListener('drop', dragDrop);
  item.addEventListener('dragenter', dragEnter); 
  item.addEventListener('dragleave', dragLeave);
})

}


check.addEventListener('click', checkOrder);