import express from "express";
import cors from "cors";

import pool from "./connection/dbConnection.js";

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES
app.post("/todos", async (request, response) => {
  // await
  try {
    const { description } = request.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    response.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.get("/todos", async (request, response) => {
  // await
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    response.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/todos/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    response.json(todo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put("/todos/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { description } = request.body;

    await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    response.json('Todo was updated');
  } catch (error) {
    console.log(error);
  }
});

app.delete('/todos/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    response.json('Todo was deleted');
  } catch (error) {
    console.log(error);
  }
})

app.listen(PORT, () => {
  console.log(`server is listening  http://localhost:${PORT}`);
});
