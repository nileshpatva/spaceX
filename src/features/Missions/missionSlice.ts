import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Mission {
  [key: string]: any;
}

export const missionSlice = createSlice({
  name: "missions",
  initialState: {
    missions: [] as Mission[],
    searchByRocket: "",
    launchStatusFilter: "None",
  },
  reducers: {
    setMissions(state, action: PayloadAction<Mission[]>) {
      state.missions = action.payload;
    },
    setSearchByRocketText(state, action: PayloadAction<string>) {
      state.searchByRocket = action.payload;
    },
    setLaunchStatusFilter(state, action: PayloadAction<string>) {
      state.launchStatusFilter = action.payload;
    },
  },
});

export const { setMissions, setSearchByRocketText, setLaunchStatusFilter } =
  missionSlice.actions;

export default missionSlice.reducer;
