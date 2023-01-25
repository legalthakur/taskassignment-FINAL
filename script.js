function onFormSubmit(){
  var formData=readFormData();
  insertNewCard(formData);
  
}

function readFormData(){
  var formData = {};
  formData["description"]= document.querySelector("#description").value;
  formData["sevierty"]=document.querySelector("#sevierty").value;
  formData["assignedTo"]=document.querySelector("#assignedTo").value;
  return formData;
}

function insertNewCard(data){
  const createCard = document.createElement("div");
  createCard.innerHTML=`
  <div class="card draggable" draggable="true" style="width: 95%;">
  <div class="card-body">
    <h5 class="card-title">${data.sevierty}</h5><span id="badge" class="badge text-bg-danger">Open</span>
    <p class="card-text">${data.description}</p>
    <p>Assigned to: ${data.assignedTo}</p>
    <button id="prev"  class="btn btn-success prev btn-sm">Prev</button>
    <button id="del"  class="btn btn-danger del btn-sm">Delete</button>
    <button id="next"  class="btn btn-success next btn-sm">Next</button>
    <button style="margin: 5px;" id="close" class="btn btn-warning btn-sm close">Close</button>
  </div>
</div>`;
const cardContainer= document.getElementById("newDiv");
cardContainer.append(createCard);  



const draggables= document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach(draggable => {
  
  draggable.addEventListener('dragstart', ()=>{
    draggable.classList.add('dragging');
  })
  draggable.addEventListener('dragend', ()=>{
    draggable.classList.remove('dragging');
  })
});

containers.forEach(container => {
  container.addEventListener('dragover', () =>{
    const draggable = document.querySelector(".dragging");
    console.log(draggable);
    container.append(draggable);
  })
})

const nextButtons = createCard.querySelectorAll(".next");
const prevButtons = createCard.querySelectorAll(".prev");
const delButtons = createCard.querySelectorAll(".del");
const closeButtons = createCard.querySelectorAll(".close");
const inprogress = document.getElementById("inDevelopmentDiv");
const QA = document.getElementById("qaDiv");
const done = document.getElementById("doneDiv");
const newD = document.getElementById("newDiv");


nextButtons.forEach(button => {
button.addEventListener('click', ()=>{
  let currentCard = button.parentElement.parentElement.parentElement;
  
  if(currentCard.parentElement.id === 'newDiv'||currentCard.id==='newDiv'){
    if(currentCard.parentElement.id === 'newDiv'){
      inprogress.appendChild(currentCard);
    }
    else{
      inprogress.appendChild(button.parentElement.parentElement);
    }
  }
  else if(currentCard.parentElement.id === "inDevelopmentDiv"||currentCard.id==='inDevelopmentDiv'){
    if(currentCard.parentElement.id === 'inDevelopmentDiv'){
      QA.appendChild(currentCard);
    }
    else{
      QA.appendChild(button.parentElement.parentElement);
    }
  }
  else if(currentCard.parentElement.id === "qaDiv"||currentCard.id==='qaDiv'){
    if(currentCard.parentElement.id === 'qaDiv'){
      done.appendChild(currentCard);
    }
    else{
      done.appendChild(button.parentElement.parentElement);
    }
  }
})
})
prevButtons.forEach(button => {
button.addEventListener('click', ()=>{
  let currentCard = button.parentElement.parentElement.parentElement;
  if(currentCard.parentElement.id === 'doneDiv'||currentCard.id==='doneDiv'){
    if(currentCard.parentElement.id === 'doneDiv'){
      
        QA.appendChild(currentCard);
      }
      else{
        QA.appendChild(button.parentElement.parentElement);
      }
  }
  else if(currentCard.parentElement.id === "qaDiv"||currentCard.id==='qaDiv'){
    if(currentCard.parentElement.id === 'qaDiv'){
      inprogress.appendChild(currentCard);
    }
    else{
      inprogress.appendChild(button.parentElement.parentElement);
    }
  }
  else if(currentCard.parentElement.id === "inDevelopmentDiv"|currentCard.id==='inDevelopmentDiv'){
    if(currentCard.parentElement.id === 'inDevelopmentDiv'){
      newD.appendChild(currentCard);
    }
    else{
      newD.appendChild(button.parentElement.parentElement);
    }
  }
})
})

delButtons.forEach(button =>{
  button.addEventListener('click', ()=>{
    let currentCard = button.parentElement.parentElement.parentElement;
    if(currentCard.id===null){
      currentCard.remove();
    }
    else{
      button.parentElement.parentElement.remove();
    }

  })
})

closeButtons.forEach(button=>{
  button.addEventListener('click',()=>{
    let currentCard = button.parentElement;
    console.log(currentCard);
    currentCard.querySelector("#badge").innerHTML="Closed";
    currentCard.querySelector("#badge").classList.remove("text-bg-danger");
    currentCard.querySelector("#badge").classList.add("text-bg-success");
    currentCard.querySelector("#close").remove();
    currentCard.querySelector("#prev").remove();
    currentCard.querySelector("#next").remove();

  })
})

}

