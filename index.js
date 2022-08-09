const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  // Serve static content
  // Run `npm run build` to build folder
  app.use(express.static(path.join(__dirname, "client/build")));
  console.log(path.join(__dirname, "client/build"));
}

//Routes

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed ) VALUES($1, $2) RETURNING *",
      [description, completed]
    );
    console.log("New Todo Created:");
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC");
    res.json(allTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update todo description
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    console.log(`Description was updated`);
    // res.json(updateTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update todo completed status
app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET completed = $1 WHERE todo_id = $2 RETURNING *",
      [completed, id]
    );
    console.log(`Completed Status was updated`);
    // res.json(updateTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// app.put("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description, completed } = req.body;

//     if (description) {
//       // If the `description` property is provided in the request body
//       const updatedTodo = await pool.query(
//         "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
//         [description, id]
//       );

//       if (updatedTodo.rowCount === 0) {
//         // If no todo was updated (no todo with the specified ID found), return a 404 status code.
//         return res.status(404).json({ message: "Todo not found" });
//       }
//       console.log(updatedTodo.rows[0]);
//       res.json(updatedTodo.rows[0]);
//     } else if (completed !== undefined) {
//       // If the `completed` property is provided in the request body
//       const updatedTodo = await pool.query(
//         "UPDATE todo SET completed = $1 WHERE todo_id = $2 RETURNING *",
//         [completed, id]
//       );

//       if (updatedTodo.rowCount === 0) {
//         // If no todo was updated (no todo with the specified ID found), return a 404 status code.
//         return res.status(404).json({ message: "Todo not found" });
//       }

//       console.log(updatedTodo.rows[0]);
//       res.json(updatedTodo.rows[0]);
//     } else {
//       // If neither `description` nor `completed` property is provided in the request body
//       return res.status(400).json({ message: "Invalid request body" });
//     }
//   } catch (err) {
//     console.error("Error while updating todo:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    console.log("Todo deleted successfully");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () =>
  console.log(`Server runnin on http://localhost:${PORT}/`)
);
