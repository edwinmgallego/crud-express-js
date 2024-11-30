const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = require("./config");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");


const app = express();
const PORT = process.env.PORT|| 3306;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const pool = mysql.createPool({
  host:DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD, // Ajusta según tu configuración
  database: DB_NAME,
  port : DB_PORT 
});

// Obtener todas las tareas
app.get("/todos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM todo");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener tareas");
  }
});

// Agregar una nueva tarea
app.post("/todos", async (req, res) => {
  const { text } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO todo (text, completed) VALUES (?, ?)",
      [text, false]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar tarea");
  }
});

// Actualizar tarea (texto o estado)
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    if (text !== undefined) {
      await pool.query("UPDATE todo SET text = ? WHERE id = ?", [text, id]);
    }
    if (completed !== undefined) {
      await pool.query("UPDATE todo SET completed = ? WHERE id = ?", [
        completed,
        id,
      ]);
    }
    res.json({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar tarea");
  }
});

// Eliminar tarea
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM todo WHERE id = ?", [id]);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar tarea");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
