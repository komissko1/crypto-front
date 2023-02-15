import React from "react";
import { community } from "../../utils/content";

function Community() {
  return (
    <section className="community">
      <h1 className="community__title">Community</h1>
      <h2 className="community__subtitle">
        Here could be real links to the project's&ensp;
        <span className="community__subtitle community__subtitle_bold">
          social media
        </span>
        &ensp;and&ensp;
        <span className="community__subtitle community__subtitle_bold">
          news channels
        </span>
      </h2>
      <p className="community__text">... and you could join the conversation.</p>
      <p className="community__text community__text_small">
        This is a text about how big is the project's community and how you could benefit of becoming it's member. Don't trust such texts.
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
                <p className="community__item-title">&#8599;</p>
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
