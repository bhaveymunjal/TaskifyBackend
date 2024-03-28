const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

// Create a new task
router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tasks
// GET /tasks?isCompleted=true&limit=10&skip=0&sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if(req.query.status) 
    match.status = req.query.status;

  if(req.query.priority)
    match.priority = req.query.priority;

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: (parseInt(req.query.page) - 1 )*parseInt(req.query.limit),
          sort
        },
      })
      .then((user) => {
        res.send(user.tasks);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a task by id
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task)
      res.status(404).send({ error: "Unauthorized Access or Task Not Exists" });
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a task by id
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "priority", "status"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) return res.status(400).send({ error: "Invalid Updates" });

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task)
      return res
        .status(404)
        .send({ error: "Unauthorized Access or Task Not Exists" });

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a task by id
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task)
      return res
        .status(404)
        .send({ error: "Unauthorized Access or Task Not Exists" });
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete all tasks
router.delete("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.deleteMany({ owner: req.user._id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send;
  }
});

module.exports = router;
