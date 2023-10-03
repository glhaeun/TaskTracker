import customReducer from './featuresFrontend/customReducer'
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    custom: customReducer, 
  }
});

export default store;

