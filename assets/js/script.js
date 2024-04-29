// make references to the HTML
const addTaskButtonEl = document.getElementById("addTaskButton");
const inputTaskTitle = document.getElementById("inputTitle");

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
    const cardTitle = $('<p>').addClass('card-text').text(oneTaskArray.status);
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
    
    const todoList = $('#todo-cards');
    const inProgressList = $('#in-progress-cards');
    const doneList = $('#done-cards');
    
    todoList.empty();
    inProgressList.empty();
    doneList.empty();
    
    for (let index = 0; index < ArrayofTasks.length; index++) {
      console.log('for loop');
      console.log(ArrayofTasks.length);
      if (ArrayofTasks[index].status === 'to-do') {
          todoList.append(createTaskCard(ArrayofTasks[index]));
          } else if (ArrayofTasks[index].status === 'in-progress') {
                    inProgressList.append(createTaskCard(ArrayofTasks[index]));
                    } else {
                            doneList.append(createTaskCard(ArrayofTasks[index]));
                           } 
    }

    $(".draggable").draggable({
      opacity: 0.7,
      zIndex:100,
      helper: function (e) {
        const original = $(e.target).hasClass('ui-draggable')
          ? $(e.target)
          : $(e.target).closest('.ui-draggable');
        return original.clone().css({
            width: original.outerWidth(),
        });
      },
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    console.log('In handleaddtask function');
    oneTaskArray = {
      // generating a unique id for the task
      "id":crypto.randomUUID(),
      "title": String(inputTaskTitle.value),
      "status": "to-do"
      };
      
      // recover data from local storage
      if (localStorage.tasks.length > 0) {
         ArrayofTasks = JSON.parse(localStorage.getItem("tasks"));
      }          
      // adding a row to the array of objets 
      ArrayofTasks.push(oneTaskArray);
      // push to the local storage
      localStorage.setItem('tasks',JSON.stringify(ArrayofTasks));

    renderTaskList();
    console.log('end of handleaddtask function');
    // initilizing inputs
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;
    ArrayofTasks = JSON.parse(localStorage.getItem("tasks"));

    for (let index = 0; index < ArrayofTasks.length; index++) { 
        if (ArrayofTasks[index].id === taskId) {
            ArrayofTasks[index].status = newStatus;
            console.log('cambia estatus')
        }
    }
    localStorage.setItem('tasks',JSON.stringify(ArrayofTasks));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    console.log('Page loaded');
    if (localStorage.tasks.length > 0) {
       ArrayofTasks = JSON.parse(localStorage.getItem("tasks"));
       } else {
              ArrayofTasks = [];
              console.log('arranca vacio');
              }
    renderTaskList();
    addTaskButtonEl.addEventListener('click', handleAddTask);

    //  droppable lines
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
});
