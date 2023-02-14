import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function UserStats(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="stats">
      <div className="stats__data">
        <p className="stats__text stats__text_grey">
          Account creation date:{currentUser.dateStamp}
        </p>
        <p className="stats__text">Invested amount, USD: 10,000.00</p>
        <p className="stats__text">
          Total number of transactions: {props.transactions}
        </p>
        {props.walletData.map(item => {
          return (
        <p className="stats__text" key={item.symbol}>
          Current funds, USD: {item.amountInUsd}
        </p>)})}
      </div>
      <div className="stats__profit">
        <p className="stats__text stats__text_large">Profit: {}</p>
      </div>
    </div>
  );
}

export default UserStats;
