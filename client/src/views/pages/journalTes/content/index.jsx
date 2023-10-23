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
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store the selected category


  const categories = Array.from(new Set(getJournalList.flatMap((entry) => entry.categories)));
  const uniqueCategories = [...new Set(categories)];
  const uniqueCategoriesText = [...new Set(uniqueCategories.map(category => category.text))];

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

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value.toLowerCase(); // Convert to lowercase
    console.log(selectedValue);
    setSelectedCategory(e.target.value); // Update the selected category
    setSearchTerm(""); // Clear the search term when a category is selected
  
    if (selectedValue === "all") {
      setJournalListData(getJournalList); // Set the list to the original data
    } else {
      filterJournalData(selectedValue); // Trigger the filter with the selected category
    }
  };
  


  const filterJournalData = (input) => {
    console.log(input)
    const filteredData = getJournalList.filter((item) => {
      if (item.categories) {
        return item.categories.some(category => category.text.toLowerCase().includes(input));
      }
    console.log(item.categories)
      return false; // Filter out items without categories
    });
  
    setJournalListData(filteredData);
  }
  

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
          <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="All">All Categories</option>
              {uniqueCategoriesText.map((category) => (
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

