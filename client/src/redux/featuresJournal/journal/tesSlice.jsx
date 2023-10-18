import { createSlice } from "@reduxjs/toolkit";
import dummyJournalData from "../../../ApiMockData/dummyJournal";

const initialState = {
  journalList: [...dummyJournalData]
};

export const tesSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addJournal: (state, action) => {
      state.journalList.push(action.payload);
    },
    updateJournal: (state, action) => {
      const { id, title, caption, content, photo, date, createdTime, editedTime, categories } = action.payload;
      const existingJournal = state.journalList.find((journal) => journal.id === id);
      if (existingJournal) {
        const updatedJournal = {
          ...existingJournal,
          title,
          caption,
          content,
          date,
          createdTime,
          editedTime,
          photo,
          categories
        };
        const index = state.journalList.indexOf(existingJournal);
        state.journalList[index] = updatedJournal;
      }
    }
    ,
    removeJournal: (state, action) => {
      state.journalList = state.journalList.filter((journal) => journal.id !== action.payload);
    }    
  },
});

export const { addJournal, updateJournal, removeJournal } = tesSlice.actions;

// Selectors
export const selectJournalList = (state) => state.journal.journalList;
export const selectJournalById = (state, journalId) =>
  state.journal.journalList.find((journal) => journal.id === journalId);

export default tesSlice.reducer;
