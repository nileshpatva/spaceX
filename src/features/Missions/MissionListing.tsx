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
  setIsUpcoming,
  setLaunchDateFilter,
  setLaunchStatusFilter,
  setMissions,
  setSearchByRocketText,
} from "./missionSlice";

export const MissionListing = () => {
  const dispatch = useAppDispatch();
  const [searchTxt, setSearchTxt] = useState("");

  const [selectedValue, setSelectedValue] = React.useState("None");
  const [isUpcoming, setisUpcoming] = React.useState("None");
  const [launchDate, setlaunchDate] = React.useState("None");

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

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(event.target.value);
    dispatch(setSearchByRocketText(event.target.value));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    dispatch(setLaunchStatusFilter(event.target.value));
  };
  const handleIsUpcomingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setisUpcoming(event.target.value);
    dispatch(setIsUpcoming(event.target.value));
  };

  const handleLaunchDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setlaunchDate(event.target.value);
    dispatch(setLaunchDateFilter(event.target.value));
  };

  return (
    <div className="ui main container">
      <Grid container spacing={2} className="ui grid">
        <div>
          <TextField
            id="standard-basic"
            value={searchTxt}
            label="Search by rocket..."
            onChange={onSearch}
          />
        </div>
        <div style={{ border: "1px solid grey", padding: "5px" }}>
          Launch Status:
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
        <div style={{ border: "1px solid grey", padding: "5px" }}>
          Upcomming?:
          <RadioGroup
            row
            name="Upcoming"
            value={isUpcoming}
            onChange={handleIsUpcomingChange}
          >
            <FormControlLabel value="None" control={<Radio />} label="None" />
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </div>
        <div style={{ border: "1px solid grey", padding: "5px" }}>
          Launch Date?:
          <RadioGroup
            row
            name="Launch Date"
            value={launchDate}
            onChange={handleLaunchDateChange}
          >
            <FormControlLabel value="None" control={<Radio />} label="None" />
            <FormControlLabel
              value="last_week"
              control={<Radio />}
              label="Last week"
            />
            <FormControlLabel
              value="last_month"
              control={<Radio />}
              label="Last month"
            />
            <FormControlLabel
              value="last_year"
              control={<Radio />}
              label="Last year"
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
