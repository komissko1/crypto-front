import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  return (
    <ul className={`navBar ${props.mode ? `navBar_${props.mode}` : ""}`}>
      {props.content.map(item => {
        return (
          <NavLink
            key={item.name}
            to={item.link}
            className={({ isActive }) =>
              isActive
                ? `navBar__link link-effect navBar__link_active`
                : `navBar__link link-effect`
            }
          >
            {item.name}
          </NavLink>
        );
      })}
    </ul>
  );
}

export default Navigation;
