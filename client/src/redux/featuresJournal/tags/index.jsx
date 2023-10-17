import { toast } from "react-toastify";
import { v4 } from "uuid";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tagsJournalList: [
    { tag: "personal", id: v4() },
    { tag: "daily", id: v4() },
  ]
};

const tagsJournalSlice = createSlice({
  name: "tagsJournal",
  initialState,
  reducers: {
    addTagsJournal: (state, { payload }) => {
      if (state.tagsJournalList.find(({ tag }) => tag === payload.tag)) {
        toast.warning("Tag already exists");
      } else {
        state.tagsJournalList.push(payload);
        toast.info("New tag is added");
      }
    },
    deleteTagsJournal: (state, { payload }) => {
      state.tagsJournalList = state.tagsJournalList.filter(({ id }) => id !== payload);
      toast.info("Tag is deleted");
    },
  },
});

export const { addTags, deleteTags } = tagsJournalSlice.actions;
export default tagsJournalSlice.reducer;
