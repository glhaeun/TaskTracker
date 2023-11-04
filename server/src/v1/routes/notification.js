require('dotenv').config();
const board = require('../models/board');
const Task = require("../models/task"); 
const User = require("../models/user"); 

const nodemailer = require('nodemailer');

const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS
    }
});

emailTransporter.verify((error, success) => {
    if(error){
      console.log(error)
    } else {
      console.log("Ready for message")
      console.log(success)
    }
  })

// const notificationTask = () => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); 
//   tomorrow.setDate(tomorrow.getDate() + 1); 

//   Task.find({ date: tomorrow })
//     .then(tasks => {
//       tasks.forEach(task => {
//         const emailContent = `
//           Hello ${task.user},
          
//           This is a reminder that you have a task "${task.title}" due tomorrow.
//           Please make sure to complete it.

//           Thank you,
//           Your Application
//         `;

//         const mailOptions = {
//           from: process.env.AUTH_EMAIL,
//           to: task.assigneeEmail, // Replace with the recipient's email
//           subject: 'Task Reminder',
//           text: emailContent
//         };

//         emailTransporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.error(error);
//           } else {
//             console.log(`Email sent: ${info.response}`);
//           }
//         });
//       });
//     })
//     .catch(err => {
//       console.error(err);
//     });
// };

const notificationTask = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the local time zone identifier
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2); // Get the date for tomorrow
    tomorrow.setUTCHours(0, 0, 0, 0); // Set time to "T00:00:00.000+00:00"

    console.log(today)
    console.log(tomorrow)

  
    Task.find({ date: tomorrow }) // Query for tasks within the local time range
      .then(async (tasks) => {
        for (const task of tasks) {
            console.log(task)
          try {
            const boardData = await board.findById(task.board);
            console.log(boardData)
            const user = await User.findById(boardData.user);
            console.log(user)
            if (user) {
              const emailContent = `
                Hello ${user.name},
                
                This is a reminder that you have a task "${task.title}" due tomorrow.
                Please make sure to complete it.
  
                Thank you,
                TKT Team
              `;
  
              const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.username, // Use user's email
                subject: 'Task Reminder',
                text: emailContent
              };
  
              emailTransporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log(`Email sent: ${info.response}`);
                }
              });
            }
          } catch (err) {
            console.error(err);
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  
  

module.exports = notificationTask;
