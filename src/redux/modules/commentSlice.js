import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import fakeData from "../../fakeData.json";
import jsonApi from "../../axios/jsonApi";
// const initialState = fakeData;

const initialState = {
  letters: [{}],
  letter: null,
  userLetters: [{}],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getData = createAsyncThunk(
  "GET_DATA",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonApi.get(
        "/letters?_sort=createdAt&_order=desc"
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetailData = createAsyncThunk(
  "GET_DETAIL_DATA",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonApi.get(`/letters/${payload}`);
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

export const __deleteData = createAsyncThunk(
  "DELETE_DATA",
  async (payload, thunkAPI) => {
    try {
      await jsonApi.delete(`/letters/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateData = createAsyncThunk(
  "UPDATE_DATA",
  async (payload, thunkAPI) => {
    try {
      await jsonApi.patch(`/letters/${payload.id}`, {
        content: payload.textarea,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateUser = createAsyncThunk(
  "UPDATE_USER",
  async (payload, thunkAPI) => {
    try {
      const updatePromises = payload.targetIds.map(async (id) => {
        await jsonApi.patch(`/letters/${id}`, {
          nickname: payload.nickname,
          avatar: payload.avatar,
        });
      });
      // await jsonApi.patch(`/letters/${payload.targetIds}`, {
      //   nickname: payload.nickname,
      //   avatar: payload.avatar,
      // });
      await Promise.all(updatePromises);
      console.log("일괄 업데이트 완료!");
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getUserLetters = createAsyncThunk(
  "GET_USER_LETTERS",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonApi.get(`/letters?userId=${payload}`);
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
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
      // return state.letters.map((item) => {
      //   if (item.id === action.payload.id)
      //     return { ...item, content: action.payload.textarea };
      //   else return item;
      // });
    },
    deleteData: async (state, action) => {
      // await jsonApi.delete(`/letters/${action.payload}`);
      // return state.letters.filter((item) => item.id !== action.payload);
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
      state.letters = action.payload;
    },
    [__getData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__getDetailData.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getDetailData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letter = action.payload;
    },
    [__getDetailData.rejected]: (state, action) => {
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
    [__deleteData.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deleteData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters.filter((item) => item.id !== action.payload);
    },
    [__deleteData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__updateData.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__updateData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters.map((item) => {
        if (item.id === action.payload.id)
          return { ...item, content: action.payload.textarea };
        else return item;
      });
    },
    [__updateData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__updateUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      console.log(action.payload);
      // state.letters.map((item) => {
      //   if (item.id === action.payload.id)
      //     return {
      //       ...item,
      //       nickname: action.payload.nickname,
      //       avatar: action.payload.avatar,
      //     };
      //   else return item;
      // });
      state.letters.map((letter) => {
        action.payload.targetIds.forEach((targetId) => {
          if (letter.id === targetId)
            return {
              ...letter,
              nickname: action.payload.nickname,
              avatar: action.payload.avatar,
            };
          else return letter;
        });
      });
    },
    [__updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__getUserLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getUserLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userLetters = action.payload;
    },
  },
});

export const { createData, updateData, deleteData } = commentSlice.actions;
export default commentSlice.reducer;
