import React from "react";
import Loader from "../Loader/Loader";

function UserWallet({walletData, isRetrievingWallet}) {

  return (
    <div className="wallet">
      {isRetrievingWallet ? (
        <Loader />
      ) : (
        walletData.map(item => {
          return (
            <div className="wallet__currency" key={item.symbol}>
              <img
                className="wallet__currency-logo"
                alt={item.name}
                src={item.logoURI}
              ></img>
              <p className="wallet__currency-amount">
                {item.amount} {item.symbol}
              </p>
              <p className="wallet__currency-amount wallet__currency-amount_small">
              {Intl.NumberFormat("en", {style: "currency", currency: "USD"}).format(item.amountInUsd)}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default UserWallet;
