import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  career: {},
};

const projetReducer = createSlice({
  name: "projet",
  initialState: initialValue,
  reducers: {
    addProject(state, action) {
      console.log("Action Data", action);
      state.career = action.payload;
    },
  },
});

export const projetActions = projetReducer.actions;
export default projetReducer.reducer;
