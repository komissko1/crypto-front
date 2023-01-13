import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../images/closeIcon.svg";
import accountPath from "../../images/account.svg";

function PopupMenu({ isOpen, onClose }) {


  return (
    <dir className={`popupMenu ${isOpen ? "popupMenu_opened" : ""}`} onClick={handleOverlay}>
      <dir className="popupMenu__container">
        <img
          className="popupMenu__close-button link-effect"
          src={closeIcon}
          alt="Закрыть"
          onClick={onClose}
        />
        <>
          <ul className="popupMenu__items">
            <li className="link-effect">
              <Link to="/" className={"popupMenu__link"} onClick={onClose}>
                Главная
              </Link>
            </li>
            <li className="link-effect">
              <Link to="/movies" className={"popupMenu__link"} onClick={onClose}>
                Фильмы
              </Link>
            </li>
            <li className="link-effect">
              <Link to="/saved-movies" className={"popupMenu__link"} onClick={onClose}>
                Сохраненные фильмы
              </Link>
            </li>
          </ul>
          <Link to="/profile" className="popupMenu__account link-effect" onClick={onClose}>
            Аккаунт
            <img
              className="popupMenu__account-pic"
              src={accountPath}
              alt="Профиль"
            />
          </Link>
        </>
      </dir>
    </dir>
  );
}

export default PopupMenu;
