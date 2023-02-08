import React from "react";
import { Link } from "react-router-dom";
import userpic from "../../images/account.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function UserData() {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="user">
          <img
            className="user__image"
            alt="Userpic"
            src={currentUser.img ? currentUser.img : userpic}
          />
          <p className="user__name">{currentUser.name}</p>
          <Link to="/profile" className="user__profile link-effect">
            Update profile
          </Link>
    </div>
  );
}

export default UserData;
