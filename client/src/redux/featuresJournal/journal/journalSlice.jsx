import { createSlice } from "@reduxjs/toolkit";
import journal from "../../../ApiMockData/journalDummyData";

const initialState = {
  contactList: [...journal]
};

export const journalSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contactList.push(action.payload);
    },
    updateContact: (state, action) => {
      const { id, name, email, telephone } = action.payload;
      const existingContact = state.contactList.find((contact) => contact.id === id);
      if (existingContact) {
        existingContact.name = name;
        existingContact.email = email;
        existingContact.telephone = telephone;
      }
    },
    removeContact: (state, action) => {
      state.contactList = state.contactList.filter((contact) => contact.id !== action.payload.id);
    },
  },
});

export const { addContact, updateContact, removeContact } = journalSlice.actions;

// Selectors
export const selectContactList = (state) => state.contact.contactList;
export const selectContactById = (state, contactId) =>
  state.contact.contactList.find((contact) => contact.id === contactId);

export default journalSlice.reducer;
