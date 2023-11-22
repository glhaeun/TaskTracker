import React, { useState } from "react";
import JournalInfo from "./cardInfo";
import DialogBox from "./DialogBox";
import { Grid } from "@mui/material";
import JournalModal from './JournalModal';

const JournalList = ({ journal ,deleteJournal, journalUpdate, setConfirmDialog}) => {
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(null);

  const JournalUpdate = (id) => {
    setID(id);
    setOpen(true);
  };

  const DialogHandle = () => {
    setOpen((current) => !current);
  };

  return (
    <div className="container mx-auto px-4">
      <Grid container spacing={4}>
        {journal &&
          journal.map((entry) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={entry.id} style={{ minWidth: '250px' }}>
              <JournalInfo 
              id={entry.id} 
              journal={entry} 
              onJournalUpdate={JournalUpdate} 
              deleteJournal={deleteJournal} 
              setConfirmDialog={setConfirmDialog} // Pass setConfirmDialog here
              />
            </Grid>
          ))}
      </Grid>

      {open && (
        <DialogBox open={open} OnDialogHandle={DialogHandle}>
          <JournalModal  id={id} journalUpdate={journalUpdate} />
        </DialogBox>
      )}
    </div>
  );
};

export default JournalList;
