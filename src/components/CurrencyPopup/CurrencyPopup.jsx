import React from "react";
import { currencyList } from "../../utils/currencyList";
import closeIcon from "../../images/closeIcon-grey.svg";

function CurrencyPopup({ onClose, wallet }) {

  const searchRef = React.useRef();
  const [searchResult, setSearchResult] = React.useState(currencyList);

  React.useEffect(() => {
    searchRef.current.value = "";
    handleSearch();
  }, []);

  React.useEffect(() => {
    const closeByEscape = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const handleOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  function handleSearch() {
    const result = currencyList.filter(
      item =>
        item.name
          .toLowerCase()
          .includes(searchRef.current.value.toLowerCase()) ||
        item.symbol
          .toLowerCase()
          .includes(searchRef.current.value.toLowerCase())
    );
    setSearchResult(result);
  }

  return (
    <section
      className="currencyList"
      onClick={handleOverlay}
    >
      <dir className="currencyList__container">
        <img
          className="currencyList__close-button link-effect"
          src={closeIcon}
          alt="Close"
          onClick={() => onClose()}
        />
        <input
          className="currencyList__input"
          type="text"
          id="search"
          ref={searchRef}
          onChange={handleSearch}
          placeholder="Enter symbol or currency name"
        ></input>
        <ul className="currencyList__lines">
          {searchResult.map(item => {
            return (
              <li className="currencyList__line" key={item.symbol}>
                <div
                  className="currencyList__link"
                  onClick={() => onClose(item.symbol)}
                >
                  <img
                    className="currencyList__logo"
                    alt={item.name}
                    src={item.logoURI}
                  ></img>
                  <p className="currencyList__name">{item.name}</p>
                  <p className="currencyList__name currencyList__name_small-grey">
                    {item.symbol}
                  </p>
                  <p
                    className={`currencyList__amount ${wallet.currencies &&
                      `${
                        wallet.currencies[`${item.symbol}`]
                          ? ""
                          : "currencyList__amount_grey"
                      }`}`}
                  >
                    {wallet.currencies &&
                      `${
                        wallet.currencies[`${item.symbol}`]
                          ? Number(wallet.currencies[`${item.symbol}`])
                          : "no funds"
                      }`}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </dir>
    </section>
  );
}

export default CurrencyPopup;
