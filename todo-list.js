
// Variables-

const inputTextElement = document.querySelector('#input-text');
const inputDateElement = document.querySelector('#input-date');
const addButtonElement = document.querySelector('#add-button');
const todoListContainer = document.querySelector('#todo-list-container');

// Get todoList from localStorage

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Display todoList

displayTodoList();

// Edit Todo

function editTodo() {



}

// Delete Todo

function deleteTodo(index) {
  
    //delete object
    todoList.splice(index, 1);

    // set in localStorage
    localStorage.setItem('todoList', JSON.stringify(todoList));

    // display todo-list
    displayTodoList();
}

// Display todo function

function displayTodoList() {
  
  // list of all todo html
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const currentObject = todoList[i];

    const todo = currentObject.todo;
    const dueDate = currentObject.dueDate;

    // current todo html
    let html = `<div class="todo-row" id="todo-row">
                <div class="todo" id="todo">${todo}</div>
                <div class="due-date" id="due-date");">${dueDate}</div>
                
                <button class="delete-button" id="delete-button" onclick="deleteTodo(${i});">Delete</button>
                </div> `;

    // add current todo html to the HTMLlist                
    todoListHTML += html; 
  }

  todoListContainer.innerHTML = todoListHTML;
}

// Add todo function

function addTodo() {

  // get input
  const todo = inputTextElement.value;
  const dueDate = inputDateElement.value;

  // check for empty input
  if (todo === '' || dueDate === ''){

    alert("Todo or due date is empty");

  } else {

    // store in array
    todoList.push({

      todo: todo,
      dueDate: dueDate,
    
    });

    // set in localStorage
    localStorage.setItem('todoList', JSON.stringify(todoList));

    // reset input
    inputTextElement.value = '';
    inputDateElement.value = '';

    // display todolist
    displayTodoList();

    console.log(todoList);

  }
}

// EventListeners-

addButtonElement.addEventListener('click', addTodo);
