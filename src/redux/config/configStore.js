import { createStore, combineReducers } from "redux";
import comment from "../modules/comment";

const rootReducer = combineReducers({
  comment,
});
const store = createStore(rootReducer);

export default store;

// const onChange = () => {
//   console.log(store.getState());
// };

// store.subscribe(onChange);
