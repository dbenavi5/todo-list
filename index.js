import pool from "./connection/dbConnection.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8000;

const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // => allows access to the req.body


app.use(express.static(path.join('./client/build')))
if (process.env.NODE_ENV === "production") {
  // serve static content
  // npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

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

    const updateList = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
      description,
      id,
    ]);
    console.log(updateList);
    response.json("Todo was updated");
  } catch (error) {
    console.log(error);
  }
});

app.delete("/todos/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteItem = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    console.log(deleteItem);
    response.json("Todo was deleted");
  } catch (error) {
    console.log(error);
  }
});

// catch all method
app.get("*", (request, response) => {
  response.status(200).sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => {
  console.log(`server is listening  http://localhost:${PORT}`);
});
