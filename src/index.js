import './css/style.css';

const tasksArray = [];
const toDoArray = [];
const notesArray = [];
let cardBorderColor;
const addTaskBtn = document.querySelector('.addTaskBtn');
const popupForm = document.querySelector('.popupContainer');
const formCloseBtn = document.querySelector('.closeFormBtn');
const closeForm = document.querySelector('.closeForm');
const formAddBtn = document.querySelector('.addBtn');
const cardContainer = document.querySelector('.cardContainer');
const noteContainer = document.querySelector('.noteContainer');
const addNoteBtn = document.querySelector('.addNoteBtn');
const popupForm2 = document.querySelector('.popupContainer2');
const formCloseBtn2 = document.querySelector('.closeFormBtn2');
const closeForm2 = document.querySelector('.closeForm2');
const formAddBtn2 = document.querySelector('.addBtn2');
const notes = document.querySelector('.notes');

const savedTasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
const savedNotesArray = JSON.parse(localStorage.getItem('notesArray')) || [];

const task = function (title, description, dueDate, priority, type) {
  return {
    title, description, dueDate, priority, type,
  };
};

const note = function (title, description) {
  return { title, description };
};

function addTask(newTask) {
  tasksArray.push(newTask);
  return tasksArray;
}

function getInputValue() {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#formDescription').value;
  const type = document.getElementById('type');
  const selectedType = type.value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority');
  const selectedPriority = priority.value;
  const newTask = task(title, description, dueDate, selectedPriority, selectedType);
  addTask(newTask);
}

function createTaskCard(arr, index) {
  const card = document.createElement('div');
  card.className = 'card';
  cardContainer.appendChild(card);

  const cardComplete = document.createElement('input');
  cardComplete.type = 'checkbox';
  cardComplete.className = 'cardComplete';
  card.appendChild(cardComplete);
  cardComplete.addEventListener('click', markCompletedTask);

  const cardTitle = document.createElement('h6');
  cardTitle.textContent += arr[index].title;
  cardTitle.className = 'cardTitle';
  card.appendChild(cardTitle);

  const cardDescription = document.createElement('p');
  cardDescription.textContent += arr[index].description;
  card.appendChild(cardDescription);

  const cardDate = document.createElement('h6');
  cardDate.textContent += arr[index].dueDate;
  cardDate.className = 'cardDate';
  card.appendChild(cardDate);

  checkPriority(arr, index);
  card.style.borderColor = cardBorderColor;

  const details = document.createElement('div');
  details.textContent = 'Details';
  details.className = 'details';
  card.appendChild(details);

  const edit = document.createElement('div');
  edit.className = 'edit';
  card.appendChild(edit);

  const remove = document.createElement('div');
  remove.className = 'remove';
  card.appendChild(remove);
  remove.addEventListener('click', removeCard);

  const midLine = document.createElement('div');
  midLine.className = 'midLine';

  function markCompletedTask() {
    if (this.checked) { card.appendChild(midLine); } else card.removeChild(midLine);
  }

  cleanStorage();
  const cardIndex = document.createElement('div');
  cardIndex.className = 'hidden';
  cardIndex.textContent = savedTasksArray.length;

  card.appendChild(cardIndex);
  saveTasksArray();
}

function displayCards() {
  getInputValue();

  createTaskCard(tasksArray, tasksArray.length - 1);
}

function makeFormVisible() {
  popupForm.style.visibility = 'visible';
}

function makeFormInvisible() {
  popupForm.style.visibility = 'hidden';
}

function checkPriority(arr, index) {
  if (arr[index].priority === 'low') { cardBorderColor = 'green'; } else if (arr[index].priority === 'medium') { cardBorderColor = 'orange'; } else { cardBorderColor = 'red'; }

  return cardBorderColor;
}

function removeCard() {
  this.parentElement.remove();
  const removedIndex = this.parentElement.children[6].textContent;

  savedTasksArray.splice(removedIndex, 1);
  localStorage.setItem('tasksArray', JSON.stringify(savedTasksArray));
}

function saveTasksArray() {
  savedTasksArray.push(tasksArray[tasksArray.length - 1]);
  localStorage.setItem('tasksArray', JSON.stringify(savedTasksArray));
}
function cleanStorage() {
  for (let i = 0; i < savedTasksArray.length; i++) {
    if (savedTasksArray[i] == null) {
      savedTasksArray.splice(i, 1);
      localStorage.setItem('tasksArray', JSON.stringify(savedTasksArray));
    }
  }
}

function displaySaved() {
  cardContainer.innerHTML = '';
  cleanStorage();
  if (savedTasksArray.length > 0) {
    for (let i = 0; i < savedTasksArray.length; i++) {
      if (savedTasksArray[i] != null) {
        createTaskCard(savedTasksArray, i);
      }
    }
  }
}

window.addEventListener('load', displaySaved);

function getInputValue2() {
  const title = document.querySelector('#title2').value;
  const description = document.querySelector('#formDescription2').value;

  const newNote = note(title, description);
  addNote(newNote);
}

function addNote(newNote) {
  notesArray.push(newNote);
  return notesArray;
}

function createNoteCard(arr, index) {
  const card = document.createElement('div');
  card.className = 'noteCard';
  cardContainer.appendChild(card);

  const cardTitle = document.createElement('h6');
  cardTitle.textContent += arr[index].title;
  cardTitle.className = 'noteCardTitle';
  card.appendChild(cardTitle);

  const cardDescription = document.createElement('p');
  cardDescription.textContent += arr[index].description;
  card.appendChild(cardDescription);

  const remove = document.createElement('div');
  remove.className = 'remove';
  card.appendChild(remove);

  const cardIndex = document.createElement('div');
  cardIndex.className = 'hidden';
  cardIndex.textContent = savedNotesArray.length;

  saveNotesArray();
}

function displayNoteCards() {
  getInputValue2();
  createNoteCard(notesArray, notesArray.length - 1);
}

function makeFormVisible2() {
  popupForm2.style.visibility = 'visible';
}

function makeFormInvisible2() {
  popupForm2.style.visibility = 'hidden';
}

function displaySavedNotes() {
  cardContainer.innerHTML = '';
  cardContainer.id = 'note-cardContainer';

  if (savedNotesArray.length > 0) {
    for (let i = 0; i < savedNotesArray.length; i++) {
      if (savedNotesArray[i] != null) {
        createNoteCard(savedNotesArray, i);
      }
    }
  }
}

function saveNotesArray() {
  savedNotesArray.push(notesArray[notesArray.length - 1]);
  localStorage.setItem('notesArray', JSON.stringify(savedNotesArray));
}

addTaskBtn.addEventListener('click', makeFormVisible);
formCloseBtn.addEventListener('click', makeFormInvisible);
closeForm.addEventListener('click', makeFormInvisible);
formAddBtn.addEventListener('click', displayCards);
addNoteBtn.addEventListener('click', makeFormVisible2);
formCloseBtn2.addEventListener('click', makeFormInvisible2);
closeForm2.addEventListener('click', makeFormInvisible2);
formAddBtn2.addEventListener('click', displayNoteCards);
notes.addEventListener('click', displaySavedNotes);
