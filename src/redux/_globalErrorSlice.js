import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  message: "",
  code: 0,
};

const globalErrorReducer = createSlice({
  name: "globalError",
  initialState: initialValue,
  reducers: {
    setError(state, action) {
      state.message = action.payload.message;
      state.code = action.payload.code;
    },
  },
});

export const globalErrorReducerActions = globalErrorReducer.actions;
export default globalErrorReducer.reducer;
