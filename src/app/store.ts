import { configureStore, Action } from "@reduxjs/toolkit";
import missionReducer from "../features/Missions/missionSlice";

export const store = configureStore({
  reducer: {
    missions: missionReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
