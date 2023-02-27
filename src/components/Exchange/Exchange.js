import React from "react";
import { Link } from "react-router-dom";
import TradeForm from "../TradeForm/TradeForm";
import CurrencyPopup from "../CurrencyPopup/CurrencyPopup";

function Exchange(props) {
  // State for currency selection popup.
  // It contains the open/close state and the id name of the currency selection button,
  // which initiated currency selection popup opening
  const [сurrenciesPopupState, setCurrenciesPopupState] = React.useState({
    isOpen: false,
    cur: ""
  });

  const openCurrenciesPopup = e => {
    setCurrenciesPopupState({ isOpen: true, cur: e.target.id });
  };

  const closeCurrenciesPopup = selectedCurrency => {
    if (selectedCurrency && сurrenciesPopupState.cur) {
      сurrenciesPopupState.cur === "cur1"
        ? props.onPairChange([selectedCurrency, props.activePair.name2])
        : props.onPairChange([props.activePair.name1, selectedCurrency]);
    }
    setCurrenciesPopupState({ isOpen: false, cur: "" });
  };

  return (
    <div className="exchange">
      <TradeForm
        activePair={props.activePair}
        onPairChange={props.onPairChange}
        getRate={props.getRate}
        wallet={props.wallet}
        openCurrenciesPopup={openCurrenciesPopup}
        infoPopupState={props.infoPopupState}
        onInfoPopupClose={props.onInfoPopupClose}
        onTransactionSubmit={props.onTransactionSubmit}
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
      {сurrenciesPopupState.isOpen && <CurrencyPopup onClose={closeCurrenciesPopup} wallet={props.wallet}/>}
    </div>
  );
}

export default Exchange;
