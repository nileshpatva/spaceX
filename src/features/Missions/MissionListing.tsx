import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { useAppDispatch } from "../../app/hooks";
import { Mission } from "./Mission";
import {
  setLaunchStatusFilter,
  setMissions,
  setSearchByRocketText,
} from "./missionSlice";

export const MissionListing = () => {
  const dispatch = useAppDispatch();
  const [searchTxt, setSearchTxt] = useState("");

  const [selectedValue, setSelectedValue] = React.useState("None");

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    dispatch(setLaunchStatusFilter(event.target.value));
  };

  return (
    <div className="ui main container">
      <Grid container spacing={2} className="ui grid">
        <div className="ui icon input">
          <TextField
            id="standard-basic"
            value={searchTxt}
            label="Search by rocket..."
            onChange={(e) => onSearch(e)}
          />
        </div>
        <div>
          Filter by Launch Status:
          <RadioGroup
            row
            name="Success"
            value={selectedValue}
            onChange={handleChange}
          >
            <FormControlLabel value="None" control={<Radio />} label="None" />
            <FormControlLabel
              value="Success"
              control={<Radio />}
              label="Success"
            />
            <FormControlLabel
              value="Failure"
              control={<Radio />}
              label="Failure"
            />
          </RadioGroup>
        </div>
      </Grid>
      <div style={{ marginTop: "2em" }} className="ui cards">
        <Grid style={{ flexGrow: 1 }} container spacing={2}>
          <Grid container justify="center" spacing={3}>
            <Mission />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
