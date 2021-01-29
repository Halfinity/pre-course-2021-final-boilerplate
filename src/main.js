const textInput = document.getElementById("text-input");
const addButton = document.getElementById("add-button");
const sortButton = document.getElementById("sort-button");
const viewSection = document.getElementById("view-section");
let taskArr = [];

const countText = document.getElementById("counter");
countText.innerText = `${JSON.parse(localStorage.getItem("taskArr")).length}`;

addButton.addEventListener("click", () => {
const pin = document.createElement("div");
pin.className = "pin";
var randomColor = Math.floor(Math.random() * 16777215).toString(16);
pin.style.backgroundColor = `#${randomColor}`;
const task = textInput.value;
if (task === "" || task === " ") {
return;
}
textInput.value = "";

let priority = document.getElementById("priority-selector").value;
const todoContainer = document.createElement("div");
todoContainer.className = "todo-container";

const color = colorTask(priority);
todoContainer.style.backgroundColor = color;

const priorityDiv = document.createElement("div");
priorityDiv.innerHTML = priority;
priorityDiv.className = "todo-priority";

const createdAtDiv = document.createElement("div");
createdAtDiv.innerHTML = new Date().toDateString();
createdAtDiv.className = "todo-created-at";

const textDiv = document.createElement("div");
textDiv.innerHTML = task;
textDiv.className = "todo-text";

todoContainer.append(pin, priorityDiv, createdAtDiv, textDiv);
viewSection.appendChild(todoContainer);

taskArr.push({
priority: priority,
date: new Date().toDateString(),
task: task,
});
});