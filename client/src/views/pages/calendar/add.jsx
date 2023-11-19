import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  Typography,
  Box
} from '@mui/material';
import ColorPicker from './colorPicker'
import calendarApi from '../../../api/calendarApi';

const CalendarModal = ({ type, open, event, onSave, onCancel, onDelete }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16)); // Adjusted format
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 16)); // Adjusted format
  const [colorLabel, setColorLabel] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [eventId, setEventId] = useState('');


  const formatDateToDateTimeLocal = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    if (event) {
      setEditMode(true);
      setTitle(event.title);
      setStartDate(event.start);
      setEndDate(event.end);
      setColorLabel(event.color);
      setDescription(event.description)
      setAllDay(event.allDay)
      setEventId(event.id)
      console.log(event.id)
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); 

      setStartDate(today.toISOString().split('.')[0]); 
      setEndDate(tomorrow.toISOString().split('.')[0]); 
    }
  }, [event]);

  const handleSave = () => {

    const eventData = {
      title: title,
      description: description,
      start: startDate,
      end: endDate,
      color: colorLabel,
      allDay: allDay
    };

    if(!event) {
      onSave(eventData);
    } else {
      onSave(eventId, eventData);
    }
    


    setTitle('');
    setStartDate(new Date());
    setEndDate(new Date());
    setColorLabel('');

    onCancel();
  };

  const handleDelete =  () => {
    onDelete(eventId)
    onCancel()
  }

  const handleAllDayToggle = (event) => {
    setAllDay(event.target.checked);
  };

  if (editMode === true) {
    return (
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle> 'Edit Event' </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: '10px' }} 
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3} 
            sx={{ marginTop: '20px' }} 
          />
          <Box sx={{display:'flex', justifyContent:'space-between'}}> 
          <TextField
            label="Start Date"
            sx={{ marginTop: '20px' }} 
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formatDateToDateTimeLocal(startDate)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
          <TextField
            label="End Date"
            sx={{ marginTop: '20px' }} 
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formatDateToDateTimeLocal(endDate)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <Typography sx={{ marginLeft: '10px' }}>All Day</Typography>
        <Switch
          checked={allDay}
          onChange={handleAllDayToggle}
        />
        </Box>
          {/* <TextField
            label="Color Label"
            fullWidth
            value={colorLabel}
            onChange={(e) => setColorLabel(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
          /> */}
          <ColorPicker colorLabel={colorLabel} setColorLabel={setColorLabel} />

        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return (
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle> 'Add Event' </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: '10px' }} 
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3} 
            sx={{ marginTop: '20px' }} 
          />
          <Box sx={{display:'flex', justifyContent:'space-between'}}> 
          <TextField
            sx={{ marginTop: '20px' }} 
            label="Start Date"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formatDateToDateTimeLocal(new Date(startDate))}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
          <TextField
            sx={{ marginTop: '20px' }} 
            label="End Date"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formatDateToDateTimeLocal(new Date(endDate))}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <Typography sx={{ marginLeft: '10px' }}>All Day</Typography>
          <Switch
            checked={allDay}
            onChange={handleAllDayToggle}
          />
          </Box>
          <ColorPicker colorLabel={colorLabel} setColorLabel={setColorLabel}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default CalendarModal;
