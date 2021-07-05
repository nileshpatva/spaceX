import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Mission {
  [key: string]: any;
}

export const missionSlice = createSlice({
  name: "missions",
  initialState: {
    missions: [] as Mission[],
  },
  reducers: {
    setMissions(state, action: PayloadAction<any[]>) {
      console.log(state, action);
      state.missions = action.payload;
    },
  },
});

export const { setMissions } = missionSlice.actions;

export default missionSlice.reducer;
