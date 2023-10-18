import { Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateJournal } from '../../../redux/featuresJournal/tesSlice';
import TextEditor from '../../TextEditor/TextEditor';


const JournalModal = ({id}) => {
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState('Untitled')
    const [caption, setCaption] = useState('Set your caption here')
    const [value, setValue] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const journalData = useSelector((state)=>
    state.journal.journalList.find((journal)=> journal.id === id));
    const journalList = useSelector((state) => state.journal.journalList);

    useEffect(() => {
        if (journalData) {
            setTitle(journalData.title)
            setCaption(journalData.caption)
            setValue(journalData.content)
        }
    }, [journalData])

    const editTitle = (e) => {
        const newTitle = e.target.value;
      
        const updatedJournalList = journalList.map((journal) =>
        journal.id === journalData.id ? { ...journal, title: newTitle } : journal
        );
        dispatch(updateJournal({ ...journalData, title: newTitle }));

        setTitle(newTitle);
      };
      

    const editCaption = (event) => {
        const newCaption= event.target.value;
        const updatedJournalList = journalList.map((journal) =>
        journal.id === journalData.id ? { ...journal, caption: newCaption } : journal
        );
        dispatch(updateJournal({ ...journalData, caption: newCaption}));
        setCaption(newCaption)
    }

    const editContent = (newValue) => {
        setValue(newValue); // Update the state with the new content
        dispatch(updateJournal({ ...journalData, content: newValue }));
    }



    const handleClose = () => {
        setOpen(false);
        navigate("/journal/all");
      };

  return (
    <>
        <Dialog open={open} onClose={handleClose} max-width="xs" fullWidth>
            <DialogTitle>{id? "Edit Journal" : "Add Journal" }</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                        value={title}
                        variant='standard'
                        InputProps={{
                            style: {
                                border: "none",
                                fontSize: '2rem',
                                fontWeight: '700',
                                disableUnderline: true
                            }
                        }}
                        fullWidth
                        onChange={editTitle}
                        sx={{
                            '& .MuiOutlinedInput-input': {padding: '10px'},
                            '& .MuiOutlinedInput-notchedOutlined': {border: 'unset'},
                            '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700'},
                        }}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                        value={caption}
                        variant='standard'
                        InputProps={{
                            style: {
                                border: "none",
                                fontSize: '1rem',
                                fontWeight: '700',
                                disableUnderline: true
                            }
                        }}
                        fullWidth
                        onChange={editCaption}
                        sx={{
                            '& .MuiOutlinedInput-input': {padding: '10px'},
                            '& .MuiOutlinedInput-notchedOutlined': {border: 'unset'},
                            '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700'},
                        }}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextEditor value={value} setValue={editContent} />
                    </Grid>
                </Grid>
                
            </DialogContent>
        </Dialog>
    </>
  )
}

export default JournalModal