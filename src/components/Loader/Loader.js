import React from "react";
import image from "../../images/loader.svg"

function Loader() {
  return (
    <div className="loader">
      <img
        className="loader__image"
        src={image}
        alt="loading"
      />
    </div>
  );
}

export default Loader;
