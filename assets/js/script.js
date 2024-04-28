// make references to the HTML
const addTaskButtonEl = document.getElementById("addTaskButton");
const otroButton = $('#addTaskButton');
const inputTaskTitle = document.getElementById("inputTitle");
const otroInput = $('#inputTitle');


// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));

// An array for the tasks
let ArrayofTasks = [
    { id:String,
      title:String,
      status:String
    }
];

// An array to receive the inputs of the form
 let oneTaskArray = [
    { id:String,
      title:String,
      status:String
    }
];

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // id: crypto.randomUUID()
}

// Todo: create a function to create a task card
function createTaskCard(oneTaskArray) {
    console.log('Creating a task CARD');
    console.log(oneTaskArray);
    const taskCard = $('<div>')
    // .addClass('card task-card draggable my-3')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', oneTaskArray.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(oneTaskArray.title);
    const cardBody = $('<div>').addClass('card-body').text(oneTaskArray.id);
    const cardTitle = $('<p>').addClass('card-text').text(oneTaskArray.title);
      // Append the card description, card due date, and card delete button to the card body.
      // cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    cardBody.append(cardTitle);
      //  Append the card header and card body to the card.
    taskCard.append(cardHeader, cardBody);
    console.log('Task CARD created');
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    console.log('render tasks');
    // ArrayofTasks = JSON.parse(localStorage.getItem("tasks"));
    // ? Empty existing project cards out of the lanes
    const todoList = $('#todo-cards');
    todoList.empty();

    for (let index = 1; index < ArrayofTasks.length; index++) {
      console.log('for loop');
      console.log(ArrayofTasks.length);
      if (ArrayofTasks[index].status === 'to-do') {
          console.log('for loop in');
          todoList.append(createTaskCard(ArrayofTasks[index]));
          } else {
            console.log('else');
            console.log(ArrayofTasks.status);
          }
    console.log('end of render tasks, adding draggable');
    
    $(".draggable").draggable();



    // for (let project of projects) {
    //   if (project.status === 'to-do') {
    //     todoList.append(createProjectCard(project));
    //   } else if (project.status === 'in-progress') {
    //     inProgressList.append(createProjectCard(project));
    //   } else if (project.status === 'done') {
    //     doneList.append(createProjectCard(project));
    //   }
    }

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    console.log('In handleaddtask function');
    console.log(inputTaskTitle.value);
    console.log(otroInput.val().trim());
    console.log(otroButton);
    oneTaskArray = {
      // generating a unique id for the task
      "id":crypto.randomUUID(),
      "title": String(inputTaskTitle.value),
      "status": "to-do"
      };
      // recover data from local storage
      ArrayofTasks = JSON.parse(localStorage.getItem("tasks"));
      // adding a row to the array of objets 
      ArrayofTasks.push(oneTaskArray);
      // push to the local storage
      localStorage.setItem('tasks',JSON.stringify(ArrayofTasks));

    console.log('end of handleaddtask function');
    // call the create a card fucntion
    createTaskCard(oneTaskArray);

}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    console.log('Page loaded');
    ArrayofTasks = JSON.parse(localStorage.getItem("tasks"));
    renderTaskList();
    addTaskButtonEl.addEventListener('click', handleAddTask);

    //  ? Make lanes droppable

    $('.lane').droppable({
      accept: '.dragable'
    });
  //  $('.lane').droppable({
  //    accept: '.draggable',
  //    // drop: handleDrop,
  //  });
});
