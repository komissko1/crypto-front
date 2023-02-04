import React from "react";
import Landing from "../Landing/Landing";
import Community from "../Community/Community";

function Main(props) {
  return (
    <div className="main">
      <Landing onPairClick={props.onPairClick}></Landing>
      <Community></Community>
    </div>
  );
}

export default Main;
