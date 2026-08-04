const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render awal
renderTodos();

// Tambah task
addBtn.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") return;

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(todo);
  saveToLocal();
  renderTodos();

  input.value = "";
});

// Render ke UI
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}">
        ${todo.text}
      </span>
      <div>
        <button onclick="toggleTodo(${todo.id})">✔</button>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">X</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Toggle selesai
function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );

  saveToLocal();
  renderTodos();
}

// Hapus
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);

  saveToLocal();
  renderTodos();
}

// Simpan
function saveToLocal() {
  localStorage.setItem("todos", JSON.stringify(todos));
}