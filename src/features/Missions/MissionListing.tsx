import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Mission } from "./Mission";
import { setMissions, setSearchByRocketText } from "./missionSlice";

export const MissionListing = () => {
  const missions = useAppSelector((state) => state.missions);
  const dispatch = useAppDispatch();
  const [searchTxt, setSearchTxt] = useState("");

  const fetchMissions = async () => {
    try {
      const response = await axios.get(
        `https://api.spacexdata.com/v3/launches`
      );

      dispatch(setMissions(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const onSearch = (e: any) => {
    setSearchTxt(e.target.value);
    dispatch(setSearchByRocketText(e.target.value));
  };

  return (
    <div style={{ marginTop: "7em" }} className="ui main container">
      <div style={{ padding: "1em 0" }} className="ui">
        <div className="ui input">
          <input
            type="text"
            value={searchTxt}
            onChange={(e) => onSearch(e)}
            placeholder="Search by rocket..."
          />
        </div>
      </div>
      <div className="ui cards">
        <Mission />
      </div>
    </div>
  );
};
