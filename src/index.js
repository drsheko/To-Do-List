import "./css/style.css"

const tasksArray = []
const toDoArray =[]
const noteArray= []
const task = function(title, description, dueDate,priority,type){
    return {title,description,dueDate,priority,type}
}
let cardBorderColor;
let cardMidLineVisibility;
function getInputValue(){
    let title =document.querySelector('#title').value
    let description =document.querySelector('#formDescription').value
    let type =document.getElementById('type')
    let selectedType = type.value
    let dueDate = document.getElementById('dueDate').value
    let priority = document.getElementById('priority')
    let selectedPriority = priority.value
    let newTask =  task(title,description,dueDate,selectedPriority,selectedType)
    addTask(newTask)
    
    
  }


  function addTask(newTask){
      tasksArray.push(newTask)
      return  tasksArray
  }

  function createTaskCard(){
      
      let card = document.createElement('div')
      card.className="card"
      cardContainer.appendChild(card)

    let cardComplete = document.createElement('input')
    cardComplete.type = "checkbox"
    cardComplete.className="cardComplete"
    card.appendChild(cardComplete)
    cardComplete.addEventListener('click',markCompletedTask)

      let cardTitle = document.createElement('h6')
      cardTitle.textContent+=tasksArray[tasksArray.length-1].title
      cardTitle.className= "cardTitle"
       card.appendChild(cardTitle)

      let cardDescription = document.createElement('p')
      cardDescription.textContent+=tasksArray[tasksArray.length-1].description 
      card.appendChild(cardDescription)

      let cardDate = document.createElement('h6')
      cardDate.textContent+=tasksArray[tasksArray.length-1].dueDate
      cardDate.className="cardDate"
      card.appendChild(cardDate)
      
      
      checkPriority()
      card.style.borderColor = cardBorderColor;


      let details = document.createElement("div")
      details.textContent="Details"
      details.className="details"
      card.appendChild(details)

      
      
      let edit = document.createElement("div")
      edit.className="edit"
      card.appendChild(edit)

      let remove = document.createElement("div")
      remove.className="remove"
      card.appendChild(remove)
      remove.addEventListener("click",removeCard)

        let midLine= document.createElement("div")
        midLine.className="midLine"
        //card.appendChild(midLine)
        midLine.style.visibility=cardMidLineVisibility
        function markCompletedTask(){
            
          if(this.checked){card.appendChild(midLine)}
          //{return cardMidLineVisibility="visible"}
         // else{return cardMidLineVisibility="hidden"}
         else card.removeChild(midLine)
        }
        chooseNote()
        alert(tasksArray.length)
    return {card,remove,cardComplete,midLine}

  }


  function displayCards(){
    getInputValue()
      
      createTaskCard()
      checkPriority()
  }


  function makeFormVisible(){
      popupForm.style.visibility = "visible";

  }

  function makeFormInvisible(){
      popupForm.style.visibility= "hidden";
  }
 
  function checkPriority(){
      if(tasksArray[tasksArray.length-1].priority ==="low"){cardBorderColor="green"}
      else if(tasksArray[tasksArray.length-1].priority==="medium"){cardBorderColor="orange"}
      else{ cardBorderColor="red"}
      
      return  cardBorderColor  
  }

  function removeCard(){
      this.parentElement.remove()
  }


  

  function chooseNote(){
    if(tasksArray[tasksArray.length-1].type ==="Note"){
        let form =document.getElementById("form")
        let dateSection =document.querySelector(".dueDateSection")
        let prioritySection =document.querySelector(".prioritySection")
    card.removeChild(dateSection);
    card.removeCard(prioritySection)
    }
}


function createToDoArray(){
    for(let i=0 ; i<tasksArray.length ; i++){
        if(tasksArray[i].type ==="To Do"){
            toDoArray.push(tasksArray[i])
        }
    }
}

function displayNotes(){
    createNoteArray()
    alert(noteArray.length)
    cardContainer.innerHTML=""
    for(let i=0 ; i<noteArray.length ; i++){
        let noteCard = document.createElement("div")
        cardContainer.appendChild(noteCard)
        let noteTitle= document.createElement("h3")
        noteTitle.textContent= noteArray[i].title
        noteCard.appendChild(noteTitle)

        let noteDescription= document.createElement("p")
        noteTitle.textContent= noteArray[i].description
        noteCard.appendChild(noteDescription)


    }
}

function createNoteArray(){
    for(let i=0 ; i<tasksArray.length ; i++){
        alert(tasksArray[i].type)
        if(tasksArray[i].type ==="note"){
            noteArray.push(tasksArray[i])
        }
    }
}
  const addTaskBtn= document.querySelector('.addTaskBtn')
  const popupForm = document.querySelector(".popupContainer")
  addTaskBtn.addEventListener('click',makeFormVisible)


  const formCloseBtn =document.querySelector('.closeFormBtn')
  formCloseBtn.addEventListener("click",makeFormInvisible)

  const closeForm =document.querySelector('.closeForm')
  closeForm.addEventListener("click",makeFormInvisible)

  const formAddBtn =document.querySelector('.addBtn')
  formAddBtn.addEventListener("click",displayCards)

 
let cardContainer =document.querySelector('.cardContainer')

const notes = document.querySelector(".notes")
notes.addEventListener("click",displayNotes)

localStorage.StoredCardContainer = cardContainer
 cardContainer = localStorage.getItem(storedCardContainer)
tasksArray.onchange = populateStorage()
function populateStorage(){
    
}
localStorage.storedWindow=window
localStorage.get("storedWindow")