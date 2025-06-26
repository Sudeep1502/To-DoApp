
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-btn");


window.addEventListener("DOMContentLoaded", loadTasks);

// Add task on button click
addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTodo();
});


clearBtn.addEventListener("click", () => {
  todoList.innerHTML = "";  
  saveTasks();              
});

function addTodo() {
  const taskText = todoInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  createTodoElement(taskText);

  saveTasks(); 
  todoInput.value = "";
}

function createTodoElement(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks(); 
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  todoList.querySelectorAll("li").forEach(li => {
    // The task text is in the li, but li.textContent includes "Delete" button text, so:
    const task = li.firstChild.textContent || li.textContent;
    tasks.push(task.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(taskText => {
    createTodoElement(taskText);
  });
}
