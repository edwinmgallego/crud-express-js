const API_URL = "http://localhost:5000/todos"; // URL del backend

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
  fetchTodos(); // Cargar tareas al inicio
});

// Obtener todas las tareas
async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
  }
}

// Renderizar tareas
function renderTodos(todos) {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = ""; // Limpiar la lista

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `
      <span class="todo-text" data-id="${todo.id}">${todo.text}</span>
      <input type="checkbox" ${todo.completed ? "checked" : ""} data-id="${
      todo.id
    }">
      <button data-id="${todo.id}" class="update-btn">Update</button>
      <button data-id="${todo.id}" class="delete-btn">Delete</button>
    `;
    todoList.appendChild(todoItem);
  });
}

// Agregar nueva tarea
document.querySelector("#todo-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.querySelector("#todo-input").value.trim();

  if (text === "") return;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    await response.json();
    fetchTodos();
    document.querySelector("#todo-input").value = "";
  } catch (error) {
    console.error("Error al agregar tarea:", error);
  }
});

// Actualizar estado o texto de una tarea
document.querySelector("#todo-list").addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("update-btn")) {
    // Botón Update
    const todoText = document.querySelector(`.todo-text[data-id="${id}"]`);
    const newText = prompt("Edit task:", todoText.textContent);

    if (newText && newText.trim() !== "") {
      updateTodoText(id, newText.trim());
    }
  } else if (e.target.type === "checkbox") {
    // Checkbox
    updateTodoStatus(id, e.target.checked);
  } else if (e.target.classList.contains("delete-btn")) {
    // Botón Delete
    deleteTodo(id);
  }
});

// Actualizar texto de una tarea
async function updateTodoText(id, newText) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });
    fetchTodos();
  } catch (error) {
    console.error("Error al actualizar texto de la tarea:", error);
  }
}

// Actualizar estado (completado) de una tarea
async function updateTodoStatus(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    fetchTodos();
  } catch (error) {
    console.error("Error al actualizar estado de la tarea:", error);
  }
}

// Eliminar tarea
async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
  }
}
