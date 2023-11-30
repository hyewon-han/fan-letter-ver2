import { createSlice } from "@reduxjs/toolkit";
import fakeData from "../../fakeData.json";
const initialState = fakeData;

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createData: (state, action) => {
      return [action.payload, ...state];
    },
    updateData: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id)
          return { ...item, content: action.payload.textarea };
        else return item;
      });
    },
    deleteData: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { createData, updateData, deleteData } = commentSlice.actions;
export default commentSlice.reducer;
