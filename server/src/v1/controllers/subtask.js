const Task = require('../models/task')
const SubTask = require('../models/subtask')

exports.create = async (req, res) => {
  const { taskId } = req.params;
  const { subtaskName } = req.body;
  try {
    const subtask = await SubTask.create({
      task: taskId,
      title: subtaskName,
      isCompleted: false
    });

    const task = await Task.findById(taskId);
    task.subtasks.push(subtask);

    await Promise.all([task.save(), subtask.save()]);
    res.status(201).json(subtask);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.update = async (req, res) => {
  const { subtaskId } = req.params

  console.log(req.body)
  try {
    const subtask = await SubTask.findByIdAndUpdate(
       subtaskId,
      { $set: req.body },
      { new: true } 
    )

    console.log(subtask)
    res.status(200).json(subtask)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.delete = async (req, res) => {
  const { subtaskId } = req.params
  try {
    await SubTask.deleteOne({ _id: subtaskId })
    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).json(err)
  }
}
