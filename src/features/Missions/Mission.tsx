import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../app/hooks";

export function Mission() {
  const missions = useAppSelector((state) => state.missions.missions);
  const searchTxt = useAppSelector((state) => state.missions.searchByRocket);

  const renderList = missions
    .filter((m) => {
      const { rocket_name, rocket_type } = m.rocket;

      return (
        rocket_name.toLowerCase().includes(searchTxt.toLowerCase()) ||
        rocket_type.toLowerCase().includes(searchTxt.toLowerCase())
      );
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
        <div key={idx} className="ui card">
          <div className="image">
            <img
              width="290"
              height="290"
              src={links.mission_patch_small}
              loading="lazy"
            />
          </div>
          <div className="content">
            <a className="header">{mission_name}</a>
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
        </div>
      );
    });

  return <>{renderList}</>;
}
