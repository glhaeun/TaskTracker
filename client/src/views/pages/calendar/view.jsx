import React, { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import AddModal from './add';
import calendarApi from '../../../api/calendarApi'
import taskApi from '../../../api/taskApi'
import CalendarCard from './calendarCard'


const View = ( {open, onClose , date, edit, closeEdit, onSave}) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [choosenDate, setChoosenDate] = useState([])
    const [choosenTask, setChoosenTask] = useState([])

    const handleEventClick = () => {
        setShowAddModal(true);
        console.log("first")
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    useEffect( () => {
      async function fetchData() {
        const data = await calendarApi.getOne(date);
        const taskData = await taskApi.getForCalendar(date);
        setChoosenDate(data)
        setChoosenTask(taskData)
        console.log(taskData)
      }
      fetchData()
    }, [])

    const formatDate = (date) => {
      const endDate = new Date(date);
      if (endDate instanceof Date) {
        return endDate.toISOString().slice(11, 16);
      }
      return "Invalid Date";
    };
    

  return (
    <>
        <Drawer sx={{width: '500px'}} anchor="right" open={open} onClose={onClose}>
        <div style={{padding: '16px', width: '300px' }}>
          <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="h3">{date}</Typography>
            <Button variant="contained" color="primary" onClick={handleEventClick}>
              New Event
            </Button>
          </Box>
          <Divider sx={{ marginTop: '8px', marginBottom: '16px' }} /> {/* Divider below date */}
          <Box>
            <Typography variant="h5" sx={{marginBottom: '10px'}}>Events</Typography>
            {choosenDate.length === 0 ? (
              <Typography>No event</Typography>
            ) : (
              choosenDate.map((item) => (
                <CalendarCard
                  key={item.id}
                  title={item.title}
                  sx={{
                    borderLeft: `5px solid ${item.color}`,
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    marginBottom: '10px'
                  }}
                  contentSX={{
                    padding: '0px'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: '10px'
                    }}
                  >
                    <Typography>Start: {formatDate(item.start)}</Typography>
                    <Typography>End: {formatDate(item.end)}</Typography>
                  </Box>
                  <Typography>All Day: {item.allDay ? 'Yes' : 'No'}</Typography>
                  <Typography>Description: {item.description}</Typography>
                </CalendarCard>
              ))
            )}
          </Box>
          <Divider sx={{ marginTop: '8px', marginBottom: '16px' }} /> {/* Divider below date */}
          <Box>
          <Typography variant="h5" sx={{marginBottom: '10px'}}>Tasks</Typography>
          {choosenTask.length === 0 ? (
            <Typography>No task</Typography>
          ) : (
            choosenTask.map((item) => (
              <CalendarCard
                key={item.id}
                title={item.title}
                sx={{
                  borderLeft: `5px solid ${item.color}`,
                  paddingLeft: '16px',
                  paddingRight: '16px'
                }}
                contentSX={{
                  padding: '0px'
                }}
              >
                <Typography>Description: {item.desc}</Typography>
              </CalendarCard>
            ))
          )}
</Box>

          
        </div>
      </Drawer>

      {showAddModal && (
        <AddModal type="add" open={showAddModal} onCancel={handleCloseAddModal} onClose={onClose} onSave={onSave} />
      )}
    </>
  )
}

export default View