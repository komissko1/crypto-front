import React from "react";
import { Link } from "react-router-dom";

import Tickers from "../Tickers/Tickers";
import { landingStats } from "../../utils/content";

function Landing(props) {
  return (
    <section className="landing">
      <article className="landing__infoblock">
        <h1 className="landing__title">
          This is a DEMO &ensp;
          <span className="landing__title landing__title_light">project</span>
        </h1>
        <h2 className="landing__subtitle">
          It's NOT a real trading platform. Everything you see here is a mock-up.
        </h2>
        <ul className="landing__stats">
          {landingStats.map(item => (
            <li className="landing__stats-content" key={item.name}>
              {item.value}
              <span className="landing__stats-content_light-text">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </article>
      <article className="landing__currencies">
        <div className="landing__currency-title">
        <p className="landing__text">
          You can click any of currency pairs and proceed to the Exchange page for that pair.
        </p>
        <p className="landing__text">
          Please, register to create your demo account and demo wallet.
        </p>
        <Link to="/signup" className = "landing__register-link link-effect">Register now</Link>
        </div>
        <Tickers onPairClick={props.onPairClick}/>
      </article>
    </section>
  );
}

export default Landing;
