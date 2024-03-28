const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    default: 'todo', // backlog, todo, cancelled, in-progress, completed
    required: true,
  },
  priority: {
    type: String,
    default: 'medium', // low, medium, high
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
},{
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task