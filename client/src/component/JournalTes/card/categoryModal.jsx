import { Dialog, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import React from 'react';

const CategoryModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          // You can store the new category value in state
        />
        <Button variant="contained" onClick={onClose}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
