// import pool from "./connection/dbConnection.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import authRouter from './routes/jwtAuth.js';
import todoRouter from './routes/todoRoutes.js';
import dashboardRouter from './routes/dashboard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8000;

const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // => allows access to the req.body


// app.use(express.static(path.join('./client/build')))
if (process.env.NODE_ENV === "production") {
  // serve static content
  // npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

// ROUTES
app.use("/auth", authRouter);
app.use("/todos", todoRouter);
app.use("/dashboard", dashboardRouter);

// catch all method
app.get("*", (request, response) => {
  response.status(200).sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => {
  console.log(`server is listening  http://localhost:${PORT}`);
});
