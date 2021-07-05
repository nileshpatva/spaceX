import React from "react";
import { MissionListing } from "./features/Missions/MissionListing";
import { Header } from "./features/Header/Header";
import "./App.css";

function App() {
  return (
    <div className="ui main container">
      <Header />
      <MissionListing />
    </div>
  );
}

export default App;
