const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector("#tasks-to-do");


let createTaskHandler = function() {
  const listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task";
  tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener("click", createTaskHandler);
