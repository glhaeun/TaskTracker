import React, { useState, useEffect } from "react";
import { Box, InputBase, Button, AppBar, Toolbar } from "@mui/material";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";


import DialogBox from "../../../../component/Journal/card/DialogBox";

import { useSelector } from 'react-redux';
import { IconPlus, IconSearch } from "@tabler/icons-react";
import JournalList from "../../../../component/finalJournal/card/cardList";
import JournalModal from './../../../../component/finalJournal/card/JournalModal';
import journalApi from "../../../../api/journalApi";
import ConfirmDialog from "../../../../component/ConfirmDialog";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [journalListData, setJournalListData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store the selected category
  const uniqueCategoriesSet = new Set();
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subtitle: ''})


  useEffect(()=> {
    const fetchJournalData = async () => {
      try {
        const journalData = await journalApi.getAll(); 
        setJournalListData(journalData);
      } catch (error) {
        console.error("Error fetching board data: ", error);
      }
    };
    fetchJournalData();
  },[searchTerm]);


  journalListData.forEach(journal => {
    if (journal.category && Array.isArray(journal.category)) {
      journal.category.forEach(category => {
        if (category.text) {
          uniqueCategoriesSet.add(category.text);
        }
      });
    }
  });
  
  const uniqueCategoriesArray = Array.from(uniqueCategoriesSet);
  

  const dialogHandle = () => {
    setOpen((current) => !current);
  };

  const handleCategoryChange = async (e) => {
    const selectedValue = e.target.value.toLowerCase(); // Convert to lowercase
    console.log(selectedValue);
    setSelectedCategory(e.target.value); // Update the selected category
    setSearchTerm(""); // Clear the search term when a category is selected
  
    if (selectedValue === "all") {
      const journalData = await journalApi.getAll(); 
      setJournalListData(journalData); // Set the list to the original data
    } else {
      filterJournalData(selectedValue); // Trigger the filter with the selected category
    }
  };


  const addJournalHandler = async (journalData) => {
    try {
      //create Journal
      const newJournal = await journalApi.create({journalData});
      console.log('Journal created:', newJournal);
      const updatedJournalData = [...journalListData, newJournal];
      setJournalListData(updatedJournalData)  
    } catch (error) {
      console.error('Error creating journal:', error);
    }
  }

  const deleteJournalHandler = async (journalId) => {
    //delete Journal
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    try {
      console.log(journalId)
      await journalApi.delete(journalId)
      const newJournalData = [...journalListData].filter(e => e.id !== journalId)
      setJournalListData(newJournalData)
    } catch(err) {
      console.log(err)
    }
    
  }
  
  const searchResult = () => {
    let filteredData = [...journalListData]; // Create a copy to avoid modifying the original state

    if (searchTerm !== "") {
      filteredData = filteredData.filter((item) => {
        if (item.title && typeof item.title === 'string') {
          return item.title.toLowerCase().includes(searchTerm);
        }
        return false;
      });
    }

    if (filteredData.length > 0) {
      return (
        <Box p={4}>
          <JournalList journal={filteredData} setConfirmDialog={setConfirmDialog} deleteJournal={deleteJournalHandler} journalUpdate={journalUpdate} />
        </Box>
      );
    } else {
      return <EmptyMsgBox>No Results Found</EmptyMsgBox>;
    }
  };

  
  const filterJournalData = (input) => {
    console.log(journalListData)
    const filteredData = journalListData.filter((item) => {
      if (item.category) {
        return item.category.some(category => category.text.toLowerCase().includes(input));
      }
    console.log(item.categories)
      return false; // Filter out items without categories
    });
  
    setJournalListData(filteredData);
  }

  const journalUpdate = async (journalId, journal) => {
    //update journal
    try {
      await journalApi.update(journalId, { journal });
  
      const newJournalListData = [...journalListData];
  
      const journalIndex = newJournalListData.findIndex((journal) => journal.id === journalId);
      if (journalIndex !== -1) {
       
        newJournalListData[journalIndex] = journal;
        
      }
        setJournalListData(newJournalListData);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <Wrapper>
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-green-200 via-indigo-200 to-pink-200">
      <AppBar position="static" color="transparent" className="hello">
        <Toolbar >
        <InputBase
          className="flex items-center h-10 px-4 ml-10 text-sm w-full bg-gray-200 rounded-full"
          placeholder="Search Final Journal …"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          startAdornment={<IconSearch />}
          value={searchTerm}
        />
          <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="All">All Categories</option>
              {uniqueCategoriesArray.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
      {searchTerm !== "" ? searchResult() : (
        <Box p={4}>
        
          <JournalList journal={journalListData} deleteJournal={deleteJournalHandler} journalUpdate={journalUpdate} setConfirmDialog = {setConfirmDialog}/>
        </Box>
      )}
      {open && (
        <DialogBox open={open} OnDialogHandle={dialogHandle}>
        <JournalModal id={""} addJournal={addJournalHandler} />

        </DialogBox>
      )}
    </div>
    <ConfirmDialog 
    confirmDialog={confirmDialog}
    setConfirmDialog = {setConfirmDialog}/>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Wrapper>
    
  );
};

export default HomePage;

