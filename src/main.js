const textInput = document.getElementById("text-input");
const addButton = document.getElementById("add-button");
const sortButton = document.getElementById("sort-button");
const clearButton = document.getElementById("clear-button");
const viewSection = document.getElementById("view-section");
const countText = document.getElementById("counter");
let taskArr = [];
const myTodo = "my-todo";
getPersistent(myTodo)
  .then((result) => {
    taskArr = result;
    console.log(result);
    countText.innerText = result.length;
    myViewSection(taskArr);
  })
  .catch((error) => {
    countText.innerText = 0;
    alert("Error");
    console.error(error);
  });

addButton.addEventListener("click", async () => {
  const task = textInput.value;
  if (task === "" || task === " ") {
    return;
  }
  let priority = document.getElementById("priority-selector").value;
  const taskArrCopy = [...taskArr];
  taskArrCopy.push({
    priority: priority,
    date: new Date().toDateString(),
    task: task,
  });
  try {
    const success = await setPersistent(myTodo, taskArrCopy);
    if (!success) {
      throw new Error("Not Success");
    }
    let value = Number(countText.innerText);
    value++;
    countText.innerText = Number(countText.innerText) + 1;
    textInput.value = "";
    taskArr = taskArrCopy;

    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";

    const priorityDiv = document.createElement("div");
    priorityDiv.innerHTML = priority;
    priorityDiv.className = "todo-priority";

    const createdAtDiv = document.createElement("div");
    createdAtDiv.innerHTML = new Date().toDateString();
    createdAtDiv.className = "todo-created-at";

    const textDiv = document.createElement("div");
    textDiv.innerHTML = task;
    textDiv.className = "todo-text";

    todoContainer.append(priorityDiv, createdAtDiv, textDiv);
    viewSection.appendChild(todoContainer);
  } catch (error) {
    console.log(error);
    alert("PROBLEM");
  }
});

sortButton.addEventListener("click", () => {
  let newArr = [];
  for (let j = 5; j >= 1; j--) {
    for (let i = 0; i < taskArr.length; i++) {
      if (Number(taskArr[i].priority) === j) {
        newArr.push(taskArr[i]);
      }
    }
  }
  myViewSection(newArr);
});

function myViewSection(arr) {
  viewSection.innerText = "";

  for (let i = 0; i < arr.length; i++) {
    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";

    const priorityDiv = document.createElement("div");
    priorityDiv.innerHTML = arr[i].priority;
    priorityDiv.className = "todo-priority";

    const createdAtDiv = document.createElement("div");
    createdAtDiv.innerHTML = arr[i].date;
    createdAtDiv.className = "todo-created-at";

    const textDiv = document.createElement("div");
    textDiv.innerHTML = arr[i].task;
    textDiv.className = "todo-text";
    todoContainer.append(priorityDiv, createdAtDiv, textDiv);
    viewSection.appendChild(todoContainer);
  }
}

clearButton.addEventListener("click", () => {
  setPersistent(myTodo, []);
  viewSection.innerHTML = " ";
  counter.textContent = 0;
  taskArr = [];
});

// ------------DARK/LIGHT MODE-------------------------

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "light") {
    toggleSwitch.checked = true;
  }
}
