import React, { useState } from "react";
import ContactInfo from "./cardInfo";
import DialogBox from "./DialogBox";
import NewCard from './newCard';

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
    <div className="flex flex-col mx-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {contacts &&
          contacts.map((contact) => (
            <ContactInfo
              key={contact.id}
              contact={contact}
              onContactUpdate={ContactUpdate}
            />
          ))}

        {open && (
          <DialogBox open={open} OnDialogHandle={DialogHandle}>
            <NewCard id={id} />
          </DialogBox>
        )}
      </div>
    </div>
  );
};

export default ContactList;
