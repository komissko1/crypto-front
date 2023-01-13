import React from "react";
import { landingStats } from "../../utils/content";

function Landing() {
  return (
    <section className="landing">
      <article className="landing__infoblock">
        <h1 className="landing__title">
          Bear & Tear&ensp;
          <span className="landing__title landing__title_light">project</span>
        </h1>
        <h2 className="landing__subtitle">
          Trade together with crypto-guru and don't cry.
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
        <h2 className="landing__subtitle">
          Trade over 200 currency pairs online. Transparent rates. Low fees.
        </h2>
        <div className="landing__currency-screen">
          <div className="landing__cirrency-grid">
            <p>asgseg</p>
            <p>asgseg</p>
            <p>asgsesrgsgsg</p>
            <p>asgseg</p>
            <p>asgseg</p>
            <p>asgseg</p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Landing;
