const connection = require("../config/db");

//  GET ALL
const getTasks = (req, res) => {
  connection.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, data: [] });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

//  GET BY ID
const getTaskById = (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM tasks WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ success: false });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false });
      }

      res.json({
        success: true,
        data: results[0],
      });
    }
  );
};

//  CREATE
const createTask = (req, res) => {
  const { title, description } = req.body;

  connection.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      res.json({
        success: true,
        message: "Task created",
      });
    }
  );
};

//  UPDATE
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  connection.query(
    "UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?",
    [title, description, completed, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      res.json({
        success: true,
        message: "Updated",
      });
    }
  );
};

//  DELETE
const deleteTask = (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      message: "Deleted",
    });
  });
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};