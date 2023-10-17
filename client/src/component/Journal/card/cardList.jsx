import React, { useState } from "react";
import ContactInfo from "./cardInfo";
import DialogBox from "./DialogBox";
import NewCard from './newCard';
import { Grid } from "@mui/material";

const ContactList = ({ contacts }) => {
  const [open, setOpen] = useState(false);
  const [id, setID] = useState([]);

  const ContactUpdate = (id) => {
    setID(id);
    setOpen(true);
  };

  const DialogHandle = () => {
    setOpen((current) => !current);
  };

  return (
    <div className="container mx-auto px-4">
      <Grid container spacing={4}>
        {contacts &&
          contacts.map((contact) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={contact.id}>
              <ContactInfo contact={contact} onContactUpdate={ContactUpdate} />
            </Grid>
          ))}
      </Grid>

      {open && (
        <DialogBox open={open} OnDialogHandle={DialogHandle}>
          <NewCard id={id} />
        </DialogBox>
      )}
    </div>
  );
};

export default ContactList;
