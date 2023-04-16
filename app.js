const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

function addTaskToList(task) {
  const listItem = document.createElement('li');
  listItem.textContent = task;
  taskList.appendChild(listItem);
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(addTaskToList);
}

function addTask(event) {
  event.preventDefault();
  const task = taskInput.value.trim();
  if (task) {
    addTaskToList(task);
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
    taskInput.value = '';
  }
}

taskForm.addEventListener('submit', addTask);
loadTasks();