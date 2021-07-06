import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { useAppSelector } from "../../app/hooks";

export function Mission() {
  const missions = useAppSelector((state) => state.missions.missions);
  const searchTxt = useAppSelector((state) => state.missions.searchByRocket);
  const isUpcoming = useAppSelector((state) => state.missions.isUpcoming);

  const launchStatus = useAppSelector(
    (state) => state.missions.launchStatusFilter
  );

  const renderList = missions
    .filter((m) => {
      const { rocket_name, rocket_type } = m.rocket;

      return (
        rocket_name.toLowerCase().includes(searchTxt.toLowerCase()) ||
        rocket_type.toLowerCase().includes(searchTxt.toLowerCase())
      );
    })
    .filter((m) => {
      if (launchStatus === "None") return true;
      if (launchStatus === "Success") return m.launch_success;
      if (launchStatus === "Failure") return !m.launch_success;
    })
    .filter((m) => {
      if (isUpcoming === "None") return true;
      if (isUpcoming === "Yes") return m.upcoming;
      if (isUpcoming === "No") return !m.upcoming;
    })
    .map((mission, idx) => {
      const {
        flight_number,
        mission_name,
        launch_year,
        details,
        rocket,
        links,
      } = mission;
      return (
        <Grid
          style={{ border: "1px solid darkgrey", margin: "5px" }}
          key={idx}
          item
          xs
        >
          <Box className="image">
            <img
              width="290"
              height="290"
              src={links.mission_patch_small}
              loading="lazy"
            />
          </Box>
          <div className="content">
            <h3 className="header">{mission_name}</h3>
            <div className="meta">
              <span className="date">{launch_year}</span>
            </div>
            <div className="description">{details}</div>
          </div>
          <div className="extra content">
            <a>Rocket Name: {rocket.rocket_name}</a>
            <br />
            <a> Rocket Type: {rocket.rocket_type}</a>
          </div>
        </Grid>
      );
    });

  return <>{renderList}</>;
}
