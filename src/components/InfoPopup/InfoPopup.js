import React from "react";
import yesIcon from "../../images/yesIcon.svg";
import noIcon from "../../images/noIcon.svg";
import closeIcon from "../../images/closeIcon-grey.svg";

const InfoPopup = ({ onClose, message, imgType }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", onClose);
    return () => {
      document.removeEventListener("keydown", onClose);
    };
  }, []);

  return (
    <div className="infoPopup" onClick={onClose}>
      <div className="infoPopup__container">
        <img
          className="infoPopup__close-button link-effect"
          src={closeIcon}
          alt="Close"
          onClick={onClose}
        />
        <img
          className="infoPopup__icon"
          src={imgType ? yesIcon : noIcon}
          alt={`${imgType}`}
        />
        <p className={`infoPopup__message ${imgType ? `infoPopup__message_orange` : ""}`}>{message}</p>
        <button
          id="infoPopupButton"
          type="button"
          aria-label="Close"
          className="infoPopup__button link-effect"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoPopup;
