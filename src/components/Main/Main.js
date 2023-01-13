import React from "react";
import Landing from "../Landing/Landing";
import Community from "../Community/Community";
// import AboutProject from "./AboutProject/AboutProject"
// import Techs from "./Techs/Techs"

function Main() {
  return (
    <div className="main">
      <Landing></Landing>
      <Community></Community>
      {/* <AboutProject></AboutProject>
      <Techs></Techs> */}
    </div>
  );
}

export default Main;
