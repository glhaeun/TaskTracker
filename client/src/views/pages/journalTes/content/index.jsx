import React, { useState, useEffect } from "react";
import { Box, InputBase, Button, AppBar, Toolbar } from "@mui/material";
import styled from 'styled-components';


import DialogBox from "../../../../component/Journal/card/DialogBox";

import { useSelector } from 'react-redux';
import { IconPlus, IconSearch } from "@tabler/icons-react";
import JournalList from "../../../../component/JournalTes/card/cardList";
import JournalModal from './../../../../component/JournalTes/card/JournalModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
  padding: 40px;
`;

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const getJournalList = useSelector((state) => state.journal.journalList);
  const [searchTerm, setSearchTerm] = useState("");
  const [journalListData, setJournalListData] = useState([]);

  useEffect(() => {
    setJournalListData(getJournalList);
    const filteredData = getJournalList.filter((item) =>
    item.title && item.title.toLowerCase().includes(searchTerm)
    );
    setJournalListData(filteredData);
  }, [getJournalList, searchTerm]);

  const dialogHandle = () => {
    setOpen((current) => !current);
  };

  return (
    <Wrapper>
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-green-200 via-indigo-200 to-pink-200">
      <AppBar position="static" color="transparent" className="hello">
        <Toolbar>
        <InputBase
          className="flex items-center h-10 px-4 ml-10 text-sm w-full bg-gray-200 rounded-full"
          placeholder="Search Journal …"
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
        <JournalList journal={journalListData} />
      </Box>
      {open && (
        <DialogBox open={open} OnDialogHandle={dialogHandle}>
          <JournalModal id={""} />
        </DialogBox>
      )}
    </div>
    </Wrapper>
  );
};

export default HomePage;

