// Global Variables
var formEl = document.getElementById("task-form");
var tasksToDoEl = document.getElementById("tasks-to-do");
var taskIdCounter = 0;
console.log(formEl);
console.log(tasksToDoEl);

var pageContentEl = document.querySelector("[id='page-content']");
console.log(pageContentEl);

var tasksInProgressEl = document.getElementById("tasks-in-progress");
var tasksCompletedEl = document.getElementById("tasks-completed");

var tasks = [];


// Utility Functions
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function() {
    // Gets task items from localStorage
    // Converts string into array
    // Iterates through to create task elements from array
    var savedTasks = localStorage.getItem("tasks");

    if (typeof(tasks) !== "undefined") {
        savedTasks = JSON.parse(tasks);

        for (var i = 0; i < savedTasks.length; i++) {
            createTaskEl(savedTasks[i]);
        }
    } else {
        savedTasks = [];
        return false;
    }
};

var completeEditTask = function(taskName, taskType, taskId) {
    // Find matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Set new values
    taskSelected.querySelector("div.task-info h3").textContent = taskName;
    taskSelected.querySelector("div.task-info span").textContent = taskType;

    // Loop through tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    saveTasks();

    formEl.removeAttribute("data-task-id");
    document.getElementById("save-task").textContent = "Add Task";
};

var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();    

    // Test for edit. Create and send Task object
    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do",
        };
        createTaskEl(taskDataObj);
    }
};

var createTaskEl = function(taskDataObj) {
    // Create Task List Item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create content container and fill w/ HTML
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Appendage to containers
    listItemEl.appendChild(taskInfoEl);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks();

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    // Create Task Actions Container
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Create Edit Button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // Create Delete Button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Complete"];
    for (var i = 0; i < statusChoices.length; i++) {
        // Create Option Element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // Append to Select Element
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId +"']");
    taskSelected.remove();

    // Search and destroy task, then update task list
    var updatedTaskArr = [];
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id != parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks = updatedTaskArr;
    saveTasks();
};

var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    document.querySelector("[id='save-task'").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "complete") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // Update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
};

var taskButtonHandler = function(event) {
    var targetEl = event.target;

    // Edit Button Click
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    // Delete Button Click
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// Event Listeners
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);