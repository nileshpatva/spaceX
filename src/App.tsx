import React from "react";
import { Mission } from "./features/Missions/Mission";
import { Header } from "./features/Header/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Mission />
    </div>
  );
}

export default App;
