// references to the HTML
const addTaskButtonEl = document.getElementById("addTaskButton");
const inputTaskTitle = document.getElementById("inputTitle");
const inputTaskDuedate = document.getElementById("inputDueDate");
const inputTaskDescription = document.getElementById("inputDescription");


// An array for TASKS
let ArrayofTasks = [
    { id:String,
      title:String,
      duedate:Date,
      description:String,
      status:String
    }
];

// An array to receive the inputs of the form
 let oneTaskArray = [
    { id:String,
      title:String,
      duedate: Date,
      description:String,
      status:String
    }
];

// Generate an unique id
function generateTaskId() {
  const randomId = crypto.randomUUID();
  return randomId;
}

// Create a task card adding elements to the HTML document
function createTaskCard(oneTaskArray) {
    // Definnig the elements and their values
    const taskCard = $('<div>').addClass('card task-card draggable my-3').attr('data-task-id', oneTaskArray.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(oneTaskArray.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDueDate = $('<p>').addClass('card-text').text(oneTaskArray.duedate);
    const cardDescription = $('<p>').addClass('card-text').text(oneTaskArray.description);
    const cardDeleteButton = $('<button>').addClass('btn-danger delete').text('Delete').attr('data-task-id', oneTaskArray.id);
    cardDeleteButton.on('click', handleDeleteTask);
    // adding elements
    cardBody.append(cardDueDate,cardDescription,cardDeleteButton);
    taskCard.append(cardHeader, cardBody);

    // Defining the color of the task on the basis of dates
    const now = dayjs();
    const taskDueDate = dayjs(oneTaskArray.duedate, 'DD/MM/YYYY');
    if (oneTaskArray.status !== "done") {
        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
                   taskCard.addClass('bg-danger text-white');
                   cardDeleteButton.addClass('border-light');
        }
    }
    return taskCard;
}

// Render the task list depending on their status and make cards draggable
function renderTaskList() {
        const todoList = $('#todo-cards');
    const inProgressList = $('#in-progress-cards');
    const doneList = $('#done-cards');
    
    // Initializing the list for every status
    todoList.empty();
    inProgressList.empty();
    doneList.empty();
    
    // A loop for the existing task
    // Adding the task to the corresponding list

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

    // Doing draggable with the API
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

// Handle to add a new task
function handleAddTask(event){
    console.log('In handleaddtask function');

    if ((String(inputTaskTitle.value) === '') ||
      (String(inputTaskDuedate.value) === '') ||
      (String(inputTaskDescription.value) === '')) {
      // validating no empty inpujts annd incase show message incomplete form
      alert('The TASK form is inclomplete, please review');
       }
      else {
            // Loading onputs to the one task array
            oneTaskArray = {
            "id":generateTaskId(),
            "title": String(inputTaskTitle.value),
            "duedate": String(inputDueDate.value),
            "description": String(inputDescription.value),
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
            //  Initilizing inputs
            inputTaskTitle.value = '';
            inputTaskDuedate.value = '';
            inputTaskDescription.value = '';
          };
}

// Handle deleting a task
function handleDeleteTask(event){

    const taskId = $(this).attr('data-task-id');
    for (let index = 0; index < ArrayofTasks.length; index++) {
        if  (ArrayofTasks[index].id === taskId) {
          ArrayofTasks.splice(index,1);
        }
    }
    localStorage.setItem('tasks',JSON.stringify(ArrayofTasks));
    renderTaskList();
  }


// Handle dropping a task into a new status lane
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

// loading the page.
// Load data from localstorage (if not empty), add listener for the add task button, date picker and drop  
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
    // Date API
    $('#inputDueDate').datepicker({
      changeMonth: true,
      changeYear:true,
    });
    // Droppable API 
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
});
