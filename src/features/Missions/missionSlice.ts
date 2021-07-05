import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Mission {
  [key: string]: any;
}

export const missionSlice = createSlice({
  name: "missions",
  initialState: {
    missions: [] as Mission[],
    searchByRocket: "",
  },
  reducers: {
    setMissions(state, action: PayloadAction<Mission[]>) {
      state.missions = action.payload;
    },
    setSearchByRocketText(state, action: PayloadAction<string>) {
      state.searchByRocket = action.payload;
    },
  },
});

export const { setMissions, setSearchByRocketText } = missionSlice.actions;

export default missionSlice.reducer;
