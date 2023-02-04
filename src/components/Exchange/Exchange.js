import React from "react";
import { Link } from "react-router-dom";
import TradeForm from "../TradeForm/TradeForm";
import CurrencyPopup from "../CurrencyPopup/CurrencyPopup";

function Exchange(props) {
  // State for currency selection popup.
  // It contains the open/close state and the id name of the currency selection button,
  // which initiated currency selection popup opening
  const [popupState, setPopupState] = React.useState({
    isOpen: false,
    cur: ""
  });

  const openPopup = e => {
    setPopupState({ isOpen: true, cur: e.target.id });
  };

  const closePopup = selectedCurrency => {
    if (selectedCurrency && popupState.cur) {
      popupState.cur === "cur1"
        ? props.getCurrencyRates([selectedCurrency, props.activePair.name2])
        : props.getCurrencyRates([props.activePair.name1, selectedCurrency]);
    }
    setPopupState({ isOpen: false, cur: "" });
  };

  return (
    <div className="exchange">
      <TradeForm
        getCurrencyRates={props.getCurrencyRates}
        activePair={props.activePair}
        wallet={props.wallet}
        openPopup={openPopup}
        onTransactionSubmit={props.onTransactionSubmit}
        onTransactionSubmitError={props.onTransactionSubmitError}
      />
      {!props.loggedIn && (
        <div className="exchange__login-section">
          <p className="exchange__text">
            You must login to access trade simulation and your demo wallet.
          </p>
          <Link to="/login" className="exchange__login-link link-effect">
            Login
          </Link>
        </div>
      )}
      <CurrencyPopup isOpen={popupState.isOpen} onClose={closePopup} wallet={props.wallet}/>
    </div>
  );
}

export default Exchange;
