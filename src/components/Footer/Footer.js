import React from "react";
import Navigation from "../Navigation/Navigation";
import { community, footerNavBar } from "../../utils/content";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <Navigation mode="small" content={footerNavBar}></Navigation>
        <div className="footer__text">Developed by Gdzenn inc. &#169;{new Date().getFullYear()}</div>
      </div>
      <div className="footer__medialinks">
        {community.map((item) => (
          <a href={item.link} target="blank" key={item.name}>
            <img
              className="footer__medialink"
              src={item.logosrc}
              alt={item.name}
            />
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
