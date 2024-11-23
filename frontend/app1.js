/*
API_URL: Es la URL base donde se encuentran las rutas de la API del backend.
 Aquí es donde el frontend enviará solicitudes para
interactuar con los datos (crear, leer, actualizar, eliminar).


* */

const apiUrl = "http://localhost:5000/todos";
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Leer tareas del servidor

/**
 * fetchTodos():
Hace una solicitud GET al backend (API_URL).
Espera la respuesta y la convierte a formato JSON.
Llama a la función renderTodos() para mostrar las tareas en la interfaz.
 * 
 */
async function fetchTodos() {
  const response = await fetch(apiUrl);
  const todos = await response.json();
  renderTodos(todos);
}
/*
Recibe la lista de tareas (todos) desde el backend.
Busca el elemento con el ID todo-list (la lista de tareas en el HTML).
Limpia su contenido (todoList.innerHTML = '';) para evitar duplicados.
Itera sobre las tareas y crea un elemento <li> para cada tarea.
Cada tarea tiene:
Texto de la tarea.
Un checkbox para marcarla como completada.
Un botón para eliminarla.
Finalmente, agrega las tareas al DOM con appendChild.

* */
// Renderizar tareas
function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTodo(todo.id);
    li.appendChild(deleteBtn);

    li.onclick = () => toggleTodo(todo.id, todo.completed);
    list.appendChild(li);
  });
}

// Agregar nueva tarea
form.onsubmit = async (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText) {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: taskText }),
    });
    input.value = "";
    fetchTodos();
  }
};

// Eliminar tarea
async function deleteTodo(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  fetchTodos();
}

// Marcar tarea como completada
async function toggleTodo(id, completed) {
  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed }),
  });
  fetchTodos();
}

// Inicializar
fetchTodos();
