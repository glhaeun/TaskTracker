import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material';

const AddModal = ({ open, event, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [colorLabel, setColorLabel] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Update the component state when the event prop changes
  useEffect(() => {
    if (event) {
      setEditMode(true);
      setTitle(event.title);
      setStartDate(event.start);
      setEndDate(event.end);
      setColorLabel(event.color);
    }
  }, [event]);

  const handleSave = () => {
    const updatedEvent = {
      title,
      start: startDate,
      end: endDate,
      color: colorLabel,
    };

    onSave(updatedEvent);

    setTitle('');
    setStartDate(new Date());
    setEndDate(new Date());
    setColorLabel('');

    onCancel();
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{editMode ? 'Edit Event' : 'Add Event'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Start Date"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={startDate.toISOString().slice(0, 16)}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        <TextField
          label="End Date"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={endDate.toISOString().slice(0, 16)}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
        <TextField
          label="Color Label"
          fullWidth
          value={colorLabel}
          onChange={(e) => setColorLabel(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">#</InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          {editMode ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
