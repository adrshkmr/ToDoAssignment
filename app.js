// app.js

window.onload = function () {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const task = { name: taskInput.value, completed: false };
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskInput.value = "";
      loadTasks();
    }
  });

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task";
      const span = document.createElement("span");
      span.textContent = task.name;
      if (task.completed) {
        span.className = "completed";
      }
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "buttonContainer";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", function () {
        tasks[index].completed = checkbox.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
      });
      const editButton = document.createElement("button");
      editButton.textContent = "✏️";
      editButton.addEventListener("click", function () {
        const newName = prompt("Enter new name", task.name);
        if (newName !== null) {
          tasks[index].name = newName;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          loadTasks();
        }
      });
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.addEventListener("click", function () {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
      });
      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(deleteButton);
      buttonContainer.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(buttonContainer);
      taskList.appendChild(li);
    });
  }

  loadTasks();
};
