import React from "react";
import Loader from "../Loader/Loader";

function UserWallet(props) {

  return (
    <div className="wallet">
      {props.isRetrievingWallet ? (
        <Loader />
      ) : ("sfgsfgs"
        // Array.from(props.walletData).map(item => {
        //   return (
        //     <div className="wallet__currency" key={item.symbol}>
        //       <img
        //         className="wallet__currency-logo"
        //         alt={item.name}
        //         src={item.logoURI}
        //       ></img>
        //       <p className="wallet__currency-amount">
        //         {item.amount} {item.symbol}
        //       </p>
        //       <p className="wallet__currency-amount wallet__currency-amount_small">
        //         {item.amountInUsd} USD
        //       </p>
        //     </div>
        //   );
        // })
      )}
    </div>
  );
}

export default UserWallet;
