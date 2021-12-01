// Global Variables
var buttonEl = document.getElementById("#save-task");
var tasksToDoEl = document.getElementById("#tasks-to-do");
console.log(buttonEl);
console.log(tasksToDoEl);

// Utility Functions
var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = prompt("What is your new task?");
    tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener("click", createTaskHandler);