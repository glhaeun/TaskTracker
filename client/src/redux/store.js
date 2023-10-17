import customReducer from './featuresFrontend/customReducer';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/userSlice";
import notesListReducer from './featuresNotes/notesList/notesListSlice';
import modalReducer from './featuresNotes/modal/modalSlice';
import tagsReducer from './featuresNotes/tags/tagsSlice';

const store = configureStore({
  reducer: {
    custom: customReducer, 
    user: userReducer,
    notesList: notesListReducer,
    modal: modalReducer,
    tags: tagsReducer
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
