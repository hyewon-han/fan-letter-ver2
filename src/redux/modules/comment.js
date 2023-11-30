import fakeData from "../../fakeData.json";

const CREATE = "comment/CREATE";
const UPDATE = "comment/UPDATE";
const DELETE = "comment/DELETE";

export const createData = (payload) => {
  return { type: CREATE, payload };
};
export const updateData = (payload) => {
  return { type: UPDATE, payload };
};
export const deleteData = (payload) => {
  return { type: DELETE, payload };
};

const initialState = fakeData;

const comment = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return [action.payload, ...state];
    case DELETE:
      return state.filter((item) => item.id !== action.payload);
    case UPDATE:
      return state.map((item) => {
        if (item.id === action.payload.id)
          return { ...item, content: action.payload.textarea };
        else return item;
      });
    default:
      return state;
  }
};

export default comment;
