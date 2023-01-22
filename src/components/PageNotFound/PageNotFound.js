import React from "react";

function PageNotFound(props) {
  return (
    <section className="page-404">
      <h3 className="page-404__title">404</h3>
      <p className="page-404__text">Page not found</p>
      <button onClick={props.onReturn} className="page-404__link link-effect">
        Back
      </button>
    </section>
  );
}

export default PageNotFound;
