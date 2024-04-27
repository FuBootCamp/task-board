// make references to the HTML
const addTaskButtonEl = document.getElementById("addTaskButton");

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    console.log('Render list');

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    console.log('In handleaddtask function');

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
