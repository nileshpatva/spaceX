import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setMissions } from "./missionSlice";

export function Mission() {
  const mission = useAppSelector((state) => state.missions.missions);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Mission</h1>
      <button onClick={() => dispatch(setMissions([]))}>Add action</button>
    </div>
  );
}
