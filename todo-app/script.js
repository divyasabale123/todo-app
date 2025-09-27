function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  let tasks = getTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");
    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Done";
    completeBtn.onclick = () => toggleTask(index);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;
  let tasks = getTasks();
  tasks.push({ text: input.value, completed: false });
  saveTasks(tasks);
  input.value = "";
  renderTasks();
}
function toggleTask(index) {
  let tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}
function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}
renderTasks();
