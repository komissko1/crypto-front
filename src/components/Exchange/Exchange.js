import React from "react";
import { Link } from "react-router-dom";
import TradeForm from "../TradeForm/TradeForm";
import CurrencyPopup from "../CurrencyPopup/CurrencyPopup";
import bitstampApi from "../../utils/BitstampApi";

function Exchange(props) {
  // State for active trade pair in the Trade Form and currency rates of each pair to USD
  const [activePair, setActivePair] = React.useState(props.activePair);
  const [activeRates, setActiveRates] = React.useState({
    cur1: "",
    cur2: ""
  });
  // State for currency selection popup.
  // It contains the open/close state and the id name of the currency selection button,
  // which initiated currency selection popup opening
  const [popupState, setPopupState] = React.useState({
    isOpen: false,
    cur: ""
  });

  // Rates request from server for updated trading pair
  async function getRates({ cur1, cur2 }) {
    const rate1 = await bitstampApi
      .getTickerData(cur1.toLowerCase() + "usd")
      .then(data => data.last)
      .catch(() => console.log("error"));
    const rate2 = await bitstampApi
      .getTickerData(cur2.toLowerCase() + "usd")
      .then(data => data.last)
      .catch(() => console.log("error"));
    setActiveRates({ cur1: rate1, cur2: rate2 });
  }

  React.useEffect(() => {
    getRates(activePair);
  }, [activePair]);

  const openPopup = e => {
    setPopupState({ isOpen: true, cur: e.target.id });
  };

  const closePopup = selectedCurrency => {
    if (selectedCurrency && popupState.cur) {
      popupState.cur === "cur1"
        ? setActivePair({ cur1: selectedCurrency, cur2: activePair.cur2 })
        : setActivePair({ cur1: activePair.cur1, cur2: selectedCurrency });
    }
    setPopupState({ isOpen: false, cur: "" });
  };

  function handleSwap(currency) {
    setActivePair(currency);
  }

  return (
    <div className="exchange">
      <TradeForm
        onSwap={handleSwap}
        activePair={activePair}
        activeRates={activeRates}
        wallet={props.wallet}
        openPopup={openPopup}
        onTransactionSubmit={props.onTransactionSubmit}
        onTransactionSubmitError={props.onTransactionSubmitError}
      />
      {!props.loggedIn && (
        <div className="exchange__login-section">
          <p className="exchange__text">You must login to trade crypto</p>
          <Link to="/login" className="exchange__login-link link-effect">
            Login
          </Link>
        </div>
      )}
      <CurrencyPopup isOpen={popupState.isOpen} onClose={closePopup} />
    </div>
  );
}

export default Exchange;
