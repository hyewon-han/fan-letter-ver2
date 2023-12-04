import commentSlice from "../modules/commentSlice";
import authSlice from "../modules/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  commentSlice,
  authSlice,
});

// persist 설정
const persistConfig = {
  key: "auth", // 스토리지에 저장될 키
  storage, // 사용할 스토리지 (로컬 스토리지)
  whitelist: ["authSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

const onChange = () => {
  console.log(store.getState());
};

store.subscribe(onChange);
