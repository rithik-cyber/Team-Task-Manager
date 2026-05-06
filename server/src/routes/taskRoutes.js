const express = require("express");

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {

  try {

    const {
      title,
      description,
      dueDate,
      priority,
      project,
      assignedTo
    } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      project,
      assignedTo
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/", authMiddleware, async (req, res) => {

  try {

    const tasks = await Task.find()
    .populate("assignedTo", "name email")
    .populate("project", "name");

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;