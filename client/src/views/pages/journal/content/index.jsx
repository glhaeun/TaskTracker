import React, { useState, useEffect } from "react";
import { Box, InputBase, Button, AppBar, Toolbar } from "@mui/material";

import ContactList from "../../../../component/Journal/card/cardList";
import NewContact from "../../../../component/Journal/card/newCard";
import DialogBox from "../../../../component/Journal/card/DialogBox";

import { useSelector } from 'react-redux';
import { IconPlus, IconSearch } from "@tabler/icons-react";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const getContactList = useSelector((state) => state.contact.contactList);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactListData, setContactListData] = useState([]);

  useEffect(() => {
    setContactListData(getContactList);
    const filteredData = getContactList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setContactListData(filteredData);
  }, [getContactList, searchTerm]);

  const dialogHandle = () => {
    setOpen((current) => !current);
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-green-200 via-indigo-200 to-pink-200">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <InputBase
            className="flex items-center h-10 px-4 ml-10 text-sm w-1/3 bg-gray-200 rounded-full"
            placeholder="Search contact …"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            startAdornment={<IconSearch />}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={dialogHandle}
            startIcon={<IconPlus />}
          >
            Add
          </Button>
          <div className="flex-grow" />
          {/* Add profile picture button */}
        </Toolbar>
      </AppBar>
      <Box p={4}>
        <ContactList contacts={contactListData} />
      </Box>
      {open && (
        <DialogBox open={open} OnDialogHandle={dialogHandle}>
          <NewContact id={""} />
        </DialogBox>
      )}
    </div>
  );
};

export default HomePage;

