import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fakeData from "../../fakeData.json";
import axios from "axios";
import jsonApi from "../../axios/jsonApi";
// const initialState = fakeData;

const initialState = {
  letters: [{}],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getData = createAsyncThunk(
  "GET_DATA",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonApi.get("/letters");
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __createData = createAsyncThunk(
  "CREATE_DATA",
  async (payload, thunkAPI) => {
    try {
      await jsonApi.post("/letters", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createData: (state, action) => {
      // await jsonApi.post("/letters", action.payload);
      // return [action.payload, ...state.letters];
    },
    updateData: (state, action) => {
      return state.letters.map((item) => {
        if (item.id === action.payload.id)
          return { ...item, content: action.payload.textarea };
        else return item;
      });
    },
    deleteData: async (state, action) => {
      await jsonApi.delete(`/letters/${action.payload}`);
      return state.letters.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: {
    [__getData.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      console.log(action.payload);
      state.letters = action.payload;
    },
    [__getData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__createData.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__createData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters.push(action.payload);
    },
    [__createData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { createData, updateData, deleteData } = commentSlice.actions;
export default commentSlice.reducer;
