// AddBoardModal.jsx
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddBoard({ open, onClose, onSubmit }) {
  const [boardName, setBoardName] = useState('');

  const handleInputChange = (event) => {
    setBoardName(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(boardName);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-section-modal-title"
      aria-describedby="add-section-modal-description"
    >
      <Box sx={style}>
        <TextField
          id="board-name-input"
          label="Enter Board Name"
          variant="outlined"
          fullWidth
          value={boardName}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default AddBoard;
