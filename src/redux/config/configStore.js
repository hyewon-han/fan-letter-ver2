import commentSlice from "../modules/commentSlice";
import authSlice from "../modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    commentSlice,
    authSlice,
  },
});

export default store;

// const onChange = () => {
//   console.log(store.getState());
// };

// store.subscribe(onChange);
