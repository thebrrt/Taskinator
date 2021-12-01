// Global Variables
var formEl = document.getElementById("task-form");
var tasksToDoEl = document.getElementById("tasks-to-do");
console.log(formEl);
console.log(tasksToDoEl);

// Utility Functions
var createTaskHandler = function(event) {
    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = prompt("What is your new task?");
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);