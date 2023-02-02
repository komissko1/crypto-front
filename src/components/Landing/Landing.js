import React from "react";
import { Link } from "react-router-dom";
import Tickers from "../Tickers/Tickers";
import { landingStats } from "../../utils/content";

function Landing(props) {
  return (
    <section className="landing">
      <article className="landing__infoblock">
        <h1 className="landing__title">
          Bear & Tear&ensp;
          <span className="landing__title landing__title_light">project</span>
        </h1>
        <h2 className="landing__subtitle">
          Trade together with crypto-gurus and don't cry.
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
        <h2 className="landing__subtitle">
          Trade over 200 currency pairs online. Transparent rates. Low fees.
        </h2>
        <Link to="/signup" className = "landing__register-link link-effect">Register now</Link>
        </div>
        <Tickers onPairClick={props.onPairClick}/>
      </article>
    </section>
  );
}

export default Landing;
