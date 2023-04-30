//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterTodo = document.querySelector('.filter-todo');

window.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterTodo.addEventListener('click', filteRTodo);

function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  const newTodo = document.createElement('li');
  if(todoInput.value === '')
  {
    return;
  }
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  saveLocal(todoInput.value);
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fa fa-check fa-lg" style="color: #313131;"></i>'
  completeButton.classList.add('complete-btn');
  todoDiv.appendChild(completeButton);
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #313131;"></i>';
  deleteButton.classList.add('trash-btn');
  todoDiv.appendChild(deleteButton);
  todoList.appendChild(todoDiv);
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add('fade');
    removeLocalTodos(todo),
    todo.addEventListener('transitionend', function() {
      todo.remove();
    })
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle('checked');
  }
}

function filteRTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if(todo.classList.contains('checked')) {
          todo.style.display = 'flex';
        }else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains('checked')) {
          todo.style.display = 'flex';
        }else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocal(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fa fa-check fa-lg" style="color: #313131;"></i>'
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #313131;"></i>';
    deleteButton.classList.add('trash-btn');
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}