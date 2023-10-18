import { toast } from "react-toastify";
import { v4 } from "uuid";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryList: [
    { category: "personal", id: v4() },
    { category: "daily", id: v4() },
    { category: "entertainment", id: v4() },
  ],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addNewCategory: (state, { payload }) => {
      if (state.categoryList.find(({ category }) => category === payload.category)) {
        toast.warning("Category already exists");
      } else {
        state.categoryList.push(payload);
        toast.info("New category is added");
      }
    },
    deleteCategory: (state, { payload }) => {
      state.categoryList = state.categoryList.filter(({ id }) => id !== payload);
      toast.info("Category is deleted");
    },
  },
});

export const { addNewCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
