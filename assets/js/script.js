// Global Variables
var formEl = document.getElementById("task-form");
var tasksToDoEl = document.getElementById("tasks-to-do");

console.log(formEl);
console.log(tasksToDoEl);

// Utility Functions
var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    console.log(taskNameInput);
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    // Data Package
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
    };

    // Send Object
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // Create Task List Item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Create content container and fill w/ HTML
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    // Appendage to containers
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);