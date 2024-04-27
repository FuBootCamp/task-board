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
      title:String
    }
];

// An array to receive the inputs of the form
 let oneTaskArray = [
    { id:String,
      title:String
    }
];

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    //const taskCard = $('<div>')
    //.addClass('card task-card draggable my-3');
    // .attr('data-task-id', project.id);

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    console.log('Render list');

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    console.log('In handleaddtask function');
    console.log(inputTaskTitle.value);
    console.log(otroInput.val().trim());
    console.log(otroButton);
    oneTaskArray = {
        "title": String(inputTaskTitle.value),
      };
      // adding a row to the array of objets 
      ArrayofTasks.push(oneTaskArray);
      // push to the local storage
      localStorage.setItem('tasks',JSON.stringify(ArrayofTasks));

    console.log('end of handleaddtask function');

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
    renderTaskList();
    addTaskButtonEl.addEventListener('click', handleAddTask);

     // ? Make lanes droppable
//   $('.lane').droppable({
//     accept: '.draggable',
//     drop: handleDrop,
//   });
});
