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

  function createTaskCard(arr,index){
      
      let card = document.createElement('div')
      card.className="card"
      cardContainer.appendChild(card)

    let cardComplete = document.createElement('input')
    cardComplete.type = "checkbox"
    cardComplete.className="cardComplete"
    card.appendChild(cardComplete)
    cardComplete.addEventListener('click',markCompletedTask)

      let cardTitle = document.createElement('h6')
      cardTitle.textContent+=arr[index].title
      cardTitle.className= "cardTitle"
       card.appendChild(cardTitle)

      let cardDescription = document.createElement('p')
      cardDescription.textContent+=arr[index].description 
      card.appendChild(cardDescription)

      let cardDate = document.createElement('h6')
      cardDate.textContent+=arr[index].dueDate
      cardDate.className="cardDate"
      card.appendChild(cardDate)
      
      
      checkPriority(arr,index)
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
       
        function markCompletedTask(){
            
          if(this.checked){card.appendChild(midLine)}
          
         else card.removeChild(midLine)
        }

        cleanStorage()
        let cardIndex = document.createElement("div")
        cardIndex.className="hidden"
        cardIndex.textContent=savedTasksArray.length
        
        card.appendChild(cardIndex) 
        saveTasksArray()
   

  }


  function displayCards(){
    getInputValue()
      
      createTaskCard(tasksArray,tasksArray.length-1)
      
  }


  function makeFormVisible(){
      popupForm.style.visibility = "visible";
      

  }

  function makeFormInvisible(){
      popupForm.style.visibility= "hidden";
  }
 
  function checkPriority(arr,index){
      if(arr[index].priority ==="low"){cardBorderColor="green"}
      else if(arr[index].priority==="medium"){cardBorderColor="orange"}
      else{ cardBorderColor="red"}
      
      return  cardBorderColor  
  }

  function removeCard(){
      this.parentElement.remove()
     let removedIndex = this.parentElement.children[6].textContent
    
     savedTasksArray.splice(removedIndex,1)
     localStorage.setItem("tasksArray",JSON.stringify(savedTasksArray))
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





var savedTasksArray= JSON.parse(localStorage.getItem("tasksArray"))|| []

function saveTasksArray(){
     savedTasksArray.push(tasksArray[tasksArray.length-1])
   localStorage.setItem("tasksArray" , JSON.stringify(savedTasksArray))
   
}
function cleanStorage(){
    for (let i=0 ; i<savedTasksArray.length;i++){
        if(savedTasksArray[i] == null){
            savedTasksArray.splice(i,1)
            localStorage.setItem("tasksArray",JSON.stringify(savedTasksArray))
        }
}
}

function displaySaved(){
    cleanStorage()
    if(savedTasksArray.length>0){
      for (let i=0 ; i<savedTasksArray.length;i++){
          if(savedTasksArray[i] != null){
          createTaskCard(savedTasksArray,i)
          }
      }
    }
 }

 window.addEventListener("load",displaySaved)

