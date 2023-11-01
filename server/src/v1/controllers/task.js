const Task = require('../models/task')
const Board = require('../models/board')

exports.create = async (req, res) => {
  const { boardId } = req.params;
  const { cardName } = req.body;

  try {
    const tasksCount = await Task.find({ board: boardId }).count();
    const task = await Task.create({
      board: boardId,
      title: cardName,
      position: tasksCount > 0 ? tasksCount : 0,
      date: new Date()
    });

    const board = await Board.findById(boardId);
    board.tasks.push(task);

    await Promise.all([task.save(), board.save()]);


    res.status(201).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.update = async (req, res) => {
  const { taskId } = req.params

  console.log(req.body)

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body.card },
      { new: true } 
    )

    console.log(task)
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json(err)
  }
}

// exports.delete = async (req, res) => {
//   const { taskId } = req.params
//   try {
//     const currentTask = await Task.findById(taskId)
//     await Task.deleteOne({ _id: taskId })
//     const tasks = await Task.find({ board: currentTask.board }).sort('postition')
//     for (const key in tasks) {
//       await Task.findByIdAndUpdate(
//         tasks[key].id,
//       { $set: { position: key } }
//       )
//       }
  
//     res.status(200).json('deleted')
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

exports.delete = async (req, res) => {
  const { taskId } = req.params;
  try {
    // Find the task and get the board it belongs to
    const currentTask = await Task.findById(taskId);
    const boardId = currentTask.board;

    // Remove the task from the board's tasks array
    await Board.findByIdAndUpdate(
      boardId,
      { $pull: { tasks: taskId } },
      { new: true } // Use { new: true } to return the updated board
    );

    // Delete the task
    await Task.deleteOne({ _id: taskId });

    // Reorder the remaining tasks in the board based on their position
    const tasks = await Task.find({ board: boardId }).sort('position');
    for (let i = 0; i < tasks.length; i++) {
      await Task.findByIdAndUpdate(
        tasks[i]._id,
        { $set: { position: i } }
      );
    }

    res.status(200).json('Task deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};



exports.updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceBoardId,
    destinationBoardId
  } = req.body

  console.log("hi")

  const resourceListReverse = resourceList.reverse()

  try {
    await Board.findByIdAndUpdate(
      resourceBoardId,
      {
        $set: {
          tasks: resourceList, 
        }
      }
    );

    await Board.findByIdAndUpdate(
      destinationBoardId,
      {
        $set: {
          tasks: destinationList, 
        }
      }
    );
  
    for (const key in resourceList) {
      const task = resourceList[key];
      await Task.findByIdAndUpdate(task._id, {
        $set: {
          board: resourceBoardId,
          position: key,
        },
      });
    }

    for (const key in destinationList) {
      const task = destinationList[key];
      await Task.findByIdAndUpdate(task._id, {
        $set: {
          board: destinationBoardId,
          position: key,
        },
      });
    }
    
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updateSection = async (req, res) => {
  
  const { taskId , sectionId} = req.body

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { section: sectionId }
    )
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getAll = async (req, res) =>{
  const sectionId = req.query.sectionId;

  try{
      const task = await Task.find({section: sectionId}).sort('-position')
      res.status(201).json(task)
  } catch(err) {
      res.status(500).json(err)
  }
}