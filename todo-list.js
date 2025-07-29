//----Variables-
const taskInputElement = document.querySelector('.js-task-input');
const dateInputElement = document.querySelector('.js-date-input');
const addButtonElement = document.querySelector('.js-add-button');
const clearAllButtonElement = document.querySelector('.js-clear-all-tasks');
const clearCompletedButtonElement = document.querySelector('.js-clear-completed-tasks');
const taskListContainer = document.querySelector('.js-display-task-list-container');
const emptyStateMessageElement = document.querySelector('.js-empty-state-message'); // ADD THIS LINE



//----Array to store list-
let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
console.log(taskList);

//render task on page load:
renderTaskList();

//----Function to render/display task list-
function renderTaskList() {

  //check for array empty state:
  if (taskList.length === 0) {
    emptyStateMessageElement.style.display = 'block'; // Show the empty message
    taskListContainer.style.display = 'none'; // Hide the <ul> list
  } else {
    emptyStateMessageElement.style.display = 'none'; // Hide the empty message
    taskListContainer.style.display = 'flex'; // Show the <ul> list (assuming your CSS has display: flex for it)
  }
  
  //clear ul initially:
  taskListContainer.innerHTML = '';

  //loop through array:
  taskList.forEach((taskObject, index) => { 

    const {task, dueDate, completed} = taskObject;

    //create list item for current object: 
    const listItem = document.createElement('li');
    listItem.classList.add('js-task-container','task-container');

    //check if task completed:
    if(completed) {
      listItem.classList.add('js-task-completed');
    }

    listItem.innerHTML = `<p class="task js-task">${task}</p>
                          <span class="due-date js-due-date">${dueDate}</span>

                          <button class="done-button js-done-button">
                            <i class="fa-solid fa-check"></i>
                          </button>
                          
                          <button class="delete-button js-delete-button">
                            <i class="fa-solid fa-trash"></i>
                          </button>`;

    //append li to ul: 
    taskListContainer.appendChild(listItem);

    //functionality for current delete button:
    const doneButton = listItem.querySelector('.js-done-button');
    doneButton.addEventListener("click", () => doneTask(index));

    //functionality for current delete button:
    const deleteButton = listItem.querySelector('.js-delete-button');
    deleteButton.addEventListener("click", () => deleteTask(index));
    
  });
}

//----Function to delete task-
function deleteTask(index) {

  taskList.splice(index, 1);

  renderTaskList();
  saveTaskToLocalStorage();
}

//----Function to clear all tasks-
function clearAllTasks() {

  //empty the array;
  taskList = [];

  saveTaskToLocalStorage();
  renderTaskList();
}

//----Function to clear completed Tasks-
function clearCompletedTasks() {

  ///filter array:
  taskList = taskList.filter(taskObject => !taskObject.completed)

  saveTaskToLocalStorage();
  renderTaskList();
}

//----Function for done button-
function doneTask(index) {

  taskList[index].completed = !taskList[index].completed;
 
  renderTaskList();
  saveTaskToLocalStorage();
}

//----Function to add task-
function addTaskAndDate() {

  // fetch input:
  const task = taskInputElement.value;
  const dueDate = dateInputElement.value;

  //check for empty input:
  if(task === '' || dueDate === '') {

    alert('Task or date is empty, Please enter both')
    return;
  }

  //push to array:
  taskList.push({
    task, dueDate, completed: false
  }); 

  //save to loacalStorage:
  saveTaskToLocalStorage();

  //render tasks: 
  renderTaskList(); 

  //
  taskInputElement.value = '';
  dateInputElement.value = '';
}

//----Function for local storage-
function saveTaskToLocalStorage() {
  
  localStorage.setItem("taskList", JSON.stringify(taskList));
}



//----EventListener-
addButtonElement.addEventListener("click", addTaskAndDate);
taskInputElement.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        addTaskAndDate();
    }
});
dateInputElement.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        addTaskAndDate();
    }
});
clearAllButtonElement.addEventListener("click", clearAllTasks);
clearCompletedButtonElement.addEventListener("click", clearCompletedTasks);

