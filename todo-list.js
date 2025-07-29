//----Variables-
const taskInputElement = document.querySelector('.js-task-input');
const dateInputElement = document.querySelector('.js-date-input');
const addButtonElement = document.querySelector('.js-add-button');

const clearAllButtonElement = document.querySelector('.js-clear-all-tasks');
const clearCompletedButtonElement = document.querySelector('.js-clear-completed-tasks');

const taskListContainer = document.querySelector('.js-display-task-list-container');
const emptyStateMessageElement = document.querySelector('.js-empty-state-message');

const alertDialogOverlay = document.querySelector('.js-alert-dialog-overlay');
const alertMessageElement = document.querySelector('.js-alert-message');
const alertOkButton = document.querySelector('.js-alert-ok-button');

const confirmationDialogOverlay = document.querySelector('.js-confirmation-dialog-overlay');
const confirmationMessageElement = document.querySelector('.js-confirmation-message');
const confirmationYesButton = document.querySelector('.js-confirm-yes-button');
const confirmationNoButton = document.querySelector('.js-confirm-no-button');


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
   if(taskList.length === 0) {
      showAlertDialog('Your To-Do list ia already empty!');
      return;
   }
   
  showConfirmationDialog('Are you sure you want to clear All tasks?', () => {
      taskList = [];
      saveTaskToLocalStorage();
      renderTaskList();
  });
}

//----Function to clear completed Tasks-
function clearCompletedTasks() {
   const completedTasks = taskList.filter(taskObject => taskObject.completed);

   if(completedTasks.length === 0) {
      showAlertDialog('You have no completed tasks to remove!');
      return;
   }

   showConfirmationDialog('Are you sure want to deleted All completed tasks?', () => {
      taskList = taskList.filter(taskObject => !taskObject.completed);
      saveTaskToLocalStorage();
      renderTaskList();
   });

}


//----Function to show alert-
function showAlertDialog(message) {
   alertMessageElement.innerText = message;
   alertDialogOverlay.classList.add('visible');

   //close on ok:
   alertOkButton.onclick = () => {
      alertDialogOverlay.classList.remove('visible');
   };
}

//----Function to show confirmation-
function showConfirmationDialog(message, onConfirmCallBack) {
   confirmationMessageElement.innerText = message;
   confirmationDialogOverlay.classList.add('visible');

   confirmationYesButton.onclick = () => {
      confirmationDialogOverlay.classList.remove('visible');
      if(onConfirmCallBack){
         onConfirmCallBack();
      }
   };

   confirmationNoButton.onclick = () => {
      confirmationDialogOverlay.classList.remove('visible');
   };
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
   showAlertDialog('Task or date is empty. Please enter both.');
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
taskInputElement.addEventListener("keydown", event => {
   if (event.key === 'Enter') {
        addTaskAndDate();
    }
});
dateInputElement.addEventListener("keydown", event => {
    if (event.key === 'Enter') {
        addTaskAndDate();
    }
});
clearAllButtonElement.addEventListener("click", clearAllTasks);
clearCompletedButtonElement.addEventListener("click", clearCompletedTasks);

