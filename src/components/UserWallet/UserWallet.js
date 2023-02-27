import React from "react";
import Loader from "../Loader/Loader";

function UserWallet(props) {
  return (
    <div className="wallet">
      <p className="wallet__text wallet__text_orange">Available funds:</p>
      <div className="wallet__container">
        {props.isRetrievingData ? (
          <Loader />
        ) : (
          props.walletData &&
          props.walletData.map((item) => {
            return (
              <div className="wallet__currency" key={item.symbol}>
                <img
                  className="wallet__currency-logo"
                  alt={item.name}
                  src={item.logoURI}
                ></img>
                <p className="wallet__text">
                  {item.symbol} {item.amount}
                </p>
                <p className="wallet__text wallet__text_small">
                  {Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.amountInUsd)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UserWallet;
