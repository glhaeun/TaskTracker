import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CustomInput from '../../../../../ApiMockData/CustomInput';
import boardApi from '../../../../../api/boardApi';
import taskApi from '../../../../../api/taskApi';
import MainCard from '../../../../../component/cards/MainCard';
import CardInfo from "./CardInfo";
import Chip from './../../../../../component/extended/Chips';
import { CheckSquare, Clock } from 'react-feather';
import './style.css'
import { MoreHorizontal } from 'react-feather';
import Menu from './Menu';
import { AlignLeft } from 'react-feather';
import { IconX } from '@tabler/icons-react';

                                       
                    
const Kanban = (props) => {
  const userId = props.userId
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState([])
  const [boardId, setBoardId] = useState(0)
  const [showDropdowns, setShowDropdowns] = useState(Array(data.length).fill(false));
  const [showIconX, setShowIconX] = useState(Array(data.length).fill(false)); // Add this line


  useEffect(()=> {
    const fetchBoardData = async () => {
      try {
        const boardData = await boardApi.getAll(); 
        setData(boardData);
      } catch (error) {
        console.error("Error fetching board data: ", error);
      }
    };
    fetchBoardData();
  },[props.board])


  const onCardMouseEnter = (index) => {
    const updatedShowIconX = [...showIconX];
    updatedShowIconX[index] = true;
    setShowIconX(updatedShowIconX);
  };

  const onCardMouseLeave = (index) => {
    const updatedShowIconX = [...showIconX];
    updatedShowIconX[index] = false;
    setShowIconX(updatedShowIconX);
  };

  const toggleBoardDropdown = (event, boardIndex) => {
    event.stopPropagation();
    const updatedShowDropdowns = [...showDropdowns];
    updatedShowDropdowns[boardIndex] = !updatedShowDropdowns[boardIndex];
    setShowDropdowns(updatedShowDropdowns);
  };

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return
    const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
    const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
    const sourceCol = data[sourceColIndex]
    const destinationCol = data[destinationColIndex]
  

    const sourceBoardId = sourceCol.id
    const destinationBoardId = destinationCol.id

    const sourceTasks = [...sourceCol.tasks]
    const destinationTasks = [...destinationCol.tasks]

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1)
      console.log(removed)
      destinationTasks.splice(destination.index, 0, removed)
      data[sourceColIndex].tasks = sourceTasks
      data[destinationColIndex].tasks = destinationTasks
    } else {
      const [removed] = destinationTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, removed)
      data[destinationColIndex].tasks = destinationTasks
    }

    try {
       await taskApi.updatePosition(sourceBoardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceBoardId: sourceBoardId,
        destinationBoardId: destinationBoardId
      })
      console.log(data)
      setData(data)
    } catch (err) {
      alert(err)
    }
  }

  const deleteBoard = async (boardId) => {
    try {
      console.log(boardId)
      await boardApi.delete(boardId)
      
      const newData = [...data].filter(e => e.id !== boardId)
      setData(newData)
    } catch(err) {
      console.log(err)
    }
  }

  const addCard = async (boardId, value) => {

    const task = await taskApi.create(boardId, { cardName: value });
  
    if (data && data.length) {
      const newData = [...data];
      const index = newData.findIndex((e) => e.id === boardId);
  
      if (index !== -1) {
        if (!newData[index].tasks) {
          newData[index].tasks = [task];
        } else {
          newData[index].tasks.unshift(task);
        }
        console.log(newData)
        setData(newData);
      } else {
        console.error("Board not found in data");
      }
    } else {
      console.error("Data is empty or undefined");
    }
  };

  const removeCard = async (boardId, taskId) => {
    const task = await taskApi.delete(boardId, taskId)

    const newData = [...data];
    newData.forEach(board => {
      board.tasks = board.tasks.filter(task => task.id !== taskId);
    });
    setData(newData)
  }

  const toggleCardInfo = (task, boardId) => {
    setShowModal(true)
    setTask(task)
    setBoardId(boardId)
  }

  const updateCard = async (boardId, taskId, card) => {
    try {
      console.log(boardId, taskId, card);
      await taskApi.update(boardId, taskId, { card });
  
      // Create a copy of the data
      const newData = [...data];
  
      // Find the board index in newData
      const boardIndex = newData.findIndex((board) => board.id === boardId);
  
      if (boardIndex !== -1) {
        // Find the task index in the board's tasks
        const taskIndex = newData[boardIndex].tasks.findIndex(
          (task) => task._id === taskId
        );
  
        if (taskIndex !== -1) {
          // Update the task with the new card data
          newData[boardIndex].tasks[taskIndex] = card;
        }
      }
  
      // Update the state with the new data
      setData(newData);
    } catch (err) {
      console.error(err);
    }
  };

  function formatDate(date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = String(dateObject.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  

  return (
    <>
    <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '30px'
          }}>
          
          <Typography  variant="body2" fontWeight="700">
          {data?.length ?? 0} Boards
          </Typography>
    </Box>
    {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={task}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{display: 'flex',
          alignItems:'flex-start',
          width: 'calc(100vw-400px)',
          overflowX: 'auto',
           gap:'20px',
      }}>
     {data?.map((board, index) => {
  return (
    <div key={board.id} style={{ width: '300px' }}>
      <Droppable key={board.id} droppableId={board.id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
          sx={{ width: '300px', padding: '10px', marginRight: '10px', backgroundColor:'white',
          borderRadius:'0.5rem', borderTop: `10px solid ${board.color}`, 
          boxShadow: '8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25)'       
          }}
          >
          <div className="board-header">
          <p className="board-header-title">
            {board?.title}
            <span>{board?.tasks?.length || 0}</span>
          </p>
          <div
            className="board-header-title-more"
            onClick={(event) => toggleBoardDropdown(event, index)}
          >
            <MoreHorizontal />
            {showDropdowns[index] && (
              <Menu className="board-dropdown" 
              onClose={() => {
                const updatedShowDropdowns = [...showDropdowns];
                updatedShowDropdowns[index] = false;
                setShowDropdowns(updatedShowDropdowns);
              }}>
                <p onClick={() => deleteBoard(board.id)}>Delete</p>
              </Menu>
            )}
          </div>
        </div>
        <Box className="card" sx={{backgroundColor: 'lightgray', padding: '10px', borderRadius: '0.5rem'}}>
            { board?.tasks?.map((task, index) => {
              console.log(task)
                return (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided, snapshot) => (
                      <MainCard 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          boxShadow: '0px 9px 12px rgba(0, 0, 0, 0.09), 0px 6px 6px rgba(0, 0, 0, 0.06)',
                          marginBottom: '10px',
                          cursor: snapshot.isDragging ? 'grab' : 'pointer!important',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                        onClick={() => toggleCardInfo(task, board.id)}
                        onMouseEnter={() => onCardMouseEnter(index)}
                        onMouseLeave={() => onCardMouseLeave(index)}
                        >
                      <div className="card-content">
                      <div className="card-top">
                        <div className="card-top-labels">
                          {task.labels?.map((item, index) => (
                            <Chip key={index} item={item} />
                          ))}
                        </div>
                    <div
                      className="card-top-more"
                      
                    >
                      {showIconX[index] && (
                        <IconX
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click event propagation
                          removeCard(board.id, task.id);
                        }}
                        />
                       )}
                      </div>
                      </div>
                      
                      <div className="card-title">{task.title}</div>
                      <div className="card-desc">
                      <AlignLeft />
                        <p>
                           {task.desc}
                        </p>
                      </div>
                      <div className="card-footer">
                      {task.date && (
                          <p className="card-footer-item">
                            <Clock
                             style={{ color: new Date(task.date) < new Date() ? 'red' : 'inherit' }}
                            className="card-footer-icon" />
                            <span
                              style={{ color: new Date(task.date) < new Date() ? 'red' : 'inherit' }}
                            >
                              {formatDate(task.date)}
                            </span>
                          </p>
                        )}
                        {task.subtasks?.length > 0 && (
                          <p className="card-footer-item">
                            <CheckSquare className="card-footer-icon" />
                            {task.subtasks?.filter((item) => item.isCompleted)?.length}/{task.subtasks?.length}
                          </p>
                        )}
                      </div>
                      </div>
                      </MainCard>
                    )}
                  </Draggable>
                );
              })
            }


            {provided.placeholder}
            <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value) => addCard(board?._id, value)}
          />
          </Box>
          </Box>

        )}
      </Droppable>
    </div>
  );
})}

      </Box>
    </DragDropContext>
    </>
  )
}

export default Kanban