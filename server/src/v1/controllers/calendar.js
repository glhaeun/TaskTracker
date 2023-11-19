const Calendar = require('../models/calendar')

exports.create = async (req,res) => {
  try {
      console.log(req.body.event)
      const calendar = await Calendar.create({
          user: req.user._id,
          title: req.body.event.title, 
          description: req.body.event.description, 
          start: req.body.event.start, 
          end: req.body.event.end, 
          color: req.body.event.color, 
          allDay: req.body.event.allDay
      })
     console.log(calendar)

      res.status(201).json(calendar)
  } catch (error) {
      res.status(500).json(error)
  }
}

exports.update = async (req, res) => {
  const {eventId} = req.params
  console.log(req.body)
  try {
      const calendar = await Calendar.findByIdAndUpdate(
            eventId,
          { $set: req.body.event}
      )
      console.log(calendar)
      res.status(200).json(calendar)
  } catch (error) {
      res.status(500).json(error)
  }
}

exports.delete = async (req, res) => {
  const {eventId} = req.params
      try {
          await Calendar.deleteOne({ _id: eventId})
          res.status(200).json('deleted')
      } catch (error) {
          res.status(500).json(error)
      }
  }

// exports.update = async (req, res) => {
//   const { taskId } = req.params

//   console.log(req.body)

//   try {
//     const task = await Task.findByIdAndUpdate(
//       taskId,
//       { $set: req.body.card },
//       { new: true } 
//     )

//     console.log(task)
//     res.status(200).json(task)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

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

// exports.delete = async (req, res) => {
//   const { taskId } = req.params;
//   try {
//     // Find the task and get the board it belongs to
//     const currentTask = await Task.findById(taskId);
//     const boardId = currentTask.board;

//     // Remove the task from the board's tasks array
//     await Board.findByIdAndUpdate(
//       boardId,
//       { $pull: { tasks: taskId } },
//       { new: true } // Use { new: true } to return the updated board
//     );

//     // Delete the task
//     await Task.deleteOne({ _id: taskId });

//     // Reorder the remaining tasks in the board based on their position
//     const tasks = await Task.find({ board: boardId }).sort('position');
//     for (let i = 0; i < tasks.length; i++) {
//       await Task.findByIdAndUpdate(
//         tasks[i]._id,
//         { $set: { position: i } }
//       );
//     }

//     res.status(200).json('Task deleted');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };



// exports.updatePosition = async (req, res) => {
//   const {
//     resourceList,
//     destinationList,
//     resourceBoardId,
//     destinationBoardId
//   } = req.body

//   console.log("hi")

//   const resourceListReverse = resourceList.reverse()

//   try {
//     await Board.findByIdAndUpdate(
//       resourceBoardId,
//       {
//         $set: {
//           tasks: resourceList, 
//         }
//       }
//     );

//     await Board.findByIdAndUpdate(
//       destinationBoardId,
//       {
//         $set: {
//           tasks: destinationList, 
//         }
//       }
//     );
  
//     for (const key in resourceList) {
//       const task = resourceList[key];
//       await Task.findByIdAndUpdate(task._id, {
//         $set: {
//           board: resourceBoardId,
//           position: key,
//         },
//       });
//     }

//     for (const key in destinationList) {
//       const task = destinationList[key];
//       await Task.findByIdAndUpdate(task._id, {
//         $set: {
//           board: destinationBoardId,
//           position: key,
//         },
//       });
//     }
    
//     res.status(200).json('updated')
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

// exports.updateSection = async (req, res) => {
  
//   const { taskId , sectionId} = req.body

//   try {
//     const task = await Task.findByIdAndUpdate(
//       taskId,
//       { section: sectionId }
//     )
//     res.status(200).json(task)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

exports.getAll = async (req, res) =>{

  try{
      const calendar = await Calendar.find({user: req.user._id})
      res.status(201).json(calendar)
  } catch(err) {
      res.status(500).json(err)
  }
}

exports.getOne = async (req, res) => {
    const { calendarDate } = req.params;
    console.log(calendarDate);
  
    try {
      const startDate = new Date(calendarDate);
      startDate.setUTCHours(0, 0, 0, 0);
  
      const endDate = new Date(calendarDate);
      endDate.setUTCHours(23, 59, 59, 999);
  
      console.log(startDate.toISOString());
      console.log(endDate.toISOString());
  
        const calendar = await Calendar.find({
            $and: [
                {
                  $or: [
                    {
                      start: { $gte: startDate.toISOString(), $lt: endDate.toISOString() }
                    },
                    {
                      end: { $gte: startDate.toISOString(), $lt: endDate.toISOString() }
                    }
                  ]
                },
                {
                  user: req.user._id  
                }
              ]
        });
  
      console.log(calendar);
      res.status(201).json(calendar);
    } catch (err) {
      res.status(500).json(err);
    }
  };
