import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Dialog, DialogTitle, DialogContent, TextareaAutosize, Divider } from "@mui/material";

import { useDispatch, useSelector } from 'react-redux';
import { addJournal, updateJournal } from "../../../redux/featuresJournal/tesSlice";
import TextEditor from "../../TextEditor/TextEditor";

const NewCardJournal = ({ id }) => {

    const handleClose = () => {
      setOpen(false);
      navigate("/journal/all");
    };
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const journalData = useSelector((state) =>
      state.journal.journalList.find((journal) => journal.id === id)
    );

    useEffect(() => {
      if (journalData) {
      const { title, caption } = journalData;
      setTitle(title)
      setCaption(caption)
      }
  }, [journalData]);


  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    dispatch(updateJournal({ title: newTitle, id }));
  };

  const handleCaptionChange = (event) => {
    const newCaption = event.target.value;
    setCaption(newCaption);
    dispatch(updateJournal({ caption: newCaption, id }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{id ? "Edit Journal" : "Add Journal"}</DialogTitle>
      <DialogContent>
  <Grid container spacing={2}>
    <Grid item xs={12}>
    <TextField 
            value={title}
            variant="standard"
              InputProps={{
                style: {
                  border: "none", 
                  fontSize: '2rem',
                  fontWeight: '700',
                  disableUnderline: true, 
                },
              }}       
            fullWidth
            onChange={handleTitleChange}
            sx={{
              '& .MuiOutlinedInput-input': {padding: '10px'},
              '& .MuiOutlinedInput-notchedOutlined': {border: 'unset'},
              '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700'},
            }} />
    </Grid>
    <Grid item xs={12}>
    <TextField 
            value={caption}
            variant="standard"
              InputProps={{
                style: {
                  border: "none", 
                  fontSize: '1rem',
                  fontWeight: '700',
                  disableUnderline: true, 
                },
              }}       
            fullWidth
            onChange={handleCaptionChange}
            sx={{
              '& .MuiOutlinedInput-input': {padding: '10px'},
              '& .MuiOutlinedInput-notchedOutlined': {border: 'unset'},
              '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700'},
            }} />
    </Grid>
    <Grid item xs={12}>
      <TextEditor/>
    </Grid>

  </Grid>

    </DialogContent>
    </Dialog>
  );
};

export default NewCardJournal;
