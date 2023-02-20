import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function UserStats(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [userStats, setUserStats] = React.useState({
    accountDate: "",
    investedAmount: 0,
    transactions: 0,
    totalFunds: 0,
    profit: 0,
  });

  React.useEffect(() => {
    setUserStats({
      accountDate: Intl.DateTimeFormat("en-Uk", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(Date.parse(currentUser.dateStamp)),
      investedAmount: Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(10000),
      transactions: props.transactions,
      totalFunds: Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(props.totalFunds),
      profit: Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(props.totalFunds - 10000),
    });
  }, [props, currentUser]);

  return (
    <div className="stats">
      <div className="stats__data">
        <p className="stats__text">
          <span className="stats__text stats__text_grey">
            Registration date:&nbsp;
          </span>
          {userStats.accountDate}
        </p>
        <p className="stats__text">
          <span className="stats__text stats__text_grey">
            Invested amount:&nbsp;
          </span>
          {userStats.investedAmount}
        </p>
        <p className="stats__text">
          <span className="stats__text stats__text_grey">
            Total transactions:&nbsp;
          </span>
          {userStats.transactions}
        </p>
        <p className="stats__text">
          <span className="stats__text stats__text_grey">
            Current funds:&nbsp;
          </span>
          {userStats.totalFunds}
        </p>
      </div>
      <div className="stats__profit">
        <p className="stats__text stats__text_grey">Your profit</p>
        <p
          className={`stats__text stats__text_large ${
            userStats.profit < 0 && "stats__text_pink"
          }`}
        >
          {userStats.profit}
        </p>
      </div>
    </div>
  );
}

export default UserStats;
