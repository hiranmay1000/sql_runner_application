import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/userAuth.slice";
import queryReducer from "./slice/query.slice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

const queryPersistConfig = {
  key: "query",
  storage,
  whitelist: ["recentQueries"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  query: persistReducer(queryPersistConfig, queryReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
