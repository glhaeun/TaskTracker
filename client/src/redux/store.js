import { configureStore } from '@reduxjs/toolkit';
import customReducer from './featuresCustom/customReducer';
import categoryReducer from './featuresJournal/categoryList/categorySlice';
import tesReducer from './featuresJournal/journal/tesSlice';
import userReducer from "./featuresLogin/userSlice";
import modalReducer from './featuresNotes/modal/modalSlice';
import notesListReducer from './featuresNotes/notesList/notesListSlice';
import tagsReducer from './featuresNotes/tags/tagsSlice';



const store = configureStore({
  reducer: {
    custom: customReducer, 
    user: userReducer,
    notesList: notesListReducer,
    modal: modalReducer,
    tags: tagsReducer, 
    journal: tesReducer,
    category: categoryReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
