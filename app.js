// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todo-filter");

// Event Listeners
document.addEventListener("DOMContentLoaded", getLıstItemsFromLocalStorage);
todoButton.addEventListener("click", addTodoItem);
todoList.addEventListener("click", deleteAndCheck);
todoFilter.addEventListener("click", filter);

// Functions

function addTodoItem(event) {
  event.preventDefault();

  if (todoInput.value.replace(/\s+/g, "").length == 0) {
    //Clear the input field
    todoInput.value = "";
    alert("You didnt write anything");
  } else {
    //Create todo List Container Div
    const todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-div");
    todoList.appendChild(todoListContainer);

    // Create li item inside the container div
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerText = todoInput.value;
    todoListContainer.appendChild(todoItem);

    //Create Delete Button inside the container div
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("delete-btn");
    todoListContainer.appendChild(deleteButton);

    //Create delete button icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas");
    deleteIcon.classList.add("fa-trash");
    deleteButton.appendChild(deleteIcon);

    //Create completed button inside the container div
    const completedButton = document.createElement("button");
    completedButton.classList.add("btn");
    completedButton.classList.add("completed-btn");
    todoListContainer.appendChild(completedButton);

    //Create checked button icon
    const completedIcon = document.createElement("i");
    completedIcon.classList.add("fas");
    completedIcon.classList.add("fa-check");
    completedButton.appendChild(completedIcon);

    //Save to-do item to LocalStorage
    saveLocalStorage(todoInput.value);

    //Clear the input field
    todoInput.value = "";
  }
}

function deleteAndCheck(event) {
  const clikcedItem = event.target;

  //deleting the list item
  if (clikcedItem.classList[1] === "delete-btn") {
    const parentItem = clikcedItem.parentElement;
    removeLıstItemFromLocalStorage(parentItem);
    parentItem.classList.add("fall-animation");
    parentItem.addEventListener("transitionend", function () {
      parentItem.remove();
    });
  }

  //marking completed item
  if (clikcedItem.classList[1] === "completed-btn") {
    const parentItem = clikcedItem.parentElement;
    parentItem.classList.toggle("completed");
  }
}

function filter(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalStorage(listItem) {
  let listItems;
  if (localStorage.getItem("listItems") === null) {
    listItems = [];
  } else {
    listItems = JSON.parse(localStorage.getItem("listItems"));
  }

  listItems.push(listItem);
  localStorage.setItem("listItems", JSON.stringify(listItems));
}

function getLıstItemsFromLocalStorage() {
  let listItems;
  if (localStorage.getItem("listItems") === null) {
    listItems = [];
  } else {
    listItems = JSON.parse(localStorage.getItem("listItems"));
  }

  listItems.forEach(function (listItem) {
    //Create todo List Container Div
    const todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-div");
    todoList.appendChild(todoListContainer);

    // Create li item inside the container div
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerText = listItem;
    todoListContainer.appendChild(todoItem);

    //Create Delete Button inside the container div
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("delete-btn");
    todoListContainer.appendChild(deleteButton);

    //Create delete button icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas");
    deleteIcon.classList.add("fa-trash");
    deleteButton.appendChild(deleteIcon);

    //Create completed button inside the container div
    const completedButton = document.createElement("button");
    completedButton.classList.add("btn");
    completedButton.classList.add("completed-btn");
    todoListContainer.appendChild(completedButton);

    //Create checked button icon
    const completedIcon = document.createElement("i");
    completedIcon.classList.add("fas");
    completedIcon.classList.add("fa-check");
    completedButton.appendChild(completedIcon);
  });
}

function removeLıstItemFromLocalStorage(listItem) {
  let listItems;
  if (localStorage.getItem("listItems") === null) {
    listItems = [];
  } else {
    listItems = JSON.parse(localStorage.getItem("listItems"));
  }

  const listItemInnerText = listItem.children[0].innerText;
  listItems.splice(listItems.indexOf(listItemInnerText), 1);

  localStorage.setItem("listItems", JSON.stringify(listItems));
}
