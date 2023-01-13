import React from "react";
import { community } from "../../utils/content";

function Community() {
  return (
    <section className="community">
      <h1 className="community__title">Community</h1>
      <h2 className="community__subtitle">
        The Bear & Tear project is an ecosystem of&ensp;
        <span className="community__subtitle community__subtitle_bold">
          crypto-gurus
        </span>
        ,&ensp;and&ensp;
        <span className="community__subtitle community__subtitle_bold">
          traders
        </span>
      </h2>
      <p className="community__text">Join the conversation.</p>
      <p className="community__text community__text_small">
        Global and vibrant community drives the success of the crypto-gurus.
        Join the conversation on Discord, Twitter, and Reddit to stay up to date
        on the latest community news.
      </p>
      <div className="community__items">
        {community.map(item => (
          <a className="community__item" href={item.link} target = "blank" key={item.name}>
            <div className="community__content">
              <div className="community__item-line">
                <p className="community__item-title">
                  <img
                    className="community__img"
                    src={item.logosrc}
                    alt={item.name}
                  />
                  {item.name}
                </p>
                <p className="community__item-title">&#11111;</p>
              </div>
              <div className="community__item-line">
                <p className="community__item-text">{item.text}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Community;
