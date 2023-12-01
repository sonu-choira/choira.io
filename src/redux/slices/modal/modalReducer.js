import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isOpen: false,
  type: "",
};

const modalReducer = createSlice({
  name: "modal",
  initialState: initialValue,
  reducers: {
    openModalWithComponent(state, action) {
      state.type = action.payload;
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const modalActions = modalReducer.actions;
export default modalReducer.reducer;
