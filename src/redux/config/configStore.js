import comment from "../modules/commentSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    comment,
  },
});

export default store;

// const onChange = () => {
//   console.log(store.getState());
// };

// store.subscribe(onChange);
