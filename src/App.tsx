import React from "react";
import { MissionListing } from "./features/Missions/MissionListing";
import { Header } from "./features/Header/Header";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "12px" }} className="ui main container">
      <Header />
      <MissionListing />
    </div>
  );
}

export default App;
