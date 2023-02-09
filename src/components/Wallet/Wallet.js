import React from "react";
import UserData from "../UserData/UserData";
import UserWallet from "../UserWallet/UserWallet";
import UserStats from "..//UserStats/UserStats";
import UserDeals from "../UserDeals/UserDeals";
import { currencyList } from "../../utils/currencyList";
import api from "../../utils/MainApi";

function Wallet(props) {
  const [transactionsData, setTransactionsData] = React.useState([]);
  const [isRetrievingWallet, setIsRetrievingWallet] = React.useState(false);
  const [
    isRetrievingTransactions,
    setIsRetrievingTransactions
  ] = React.useState(false);
  const [walletData, setWalletData] = React.useState([]);

  React.useEffect(() => {
    const loaderTimer = setTimeout(() => setIsRetrievingWallet(true), 1000);
    const ownFunds = currencyList.reduce((arr, item) => {
      if (Object.keys(props.wallet.currencies).includes(item.symbol)) {
        item.amount = props.wallet.currencies[`${item.symbol}`];
        props
          .getRate(item.symbol)
          .then(rate => {
            item.amountInUsd = item.amount * rate;
            arr.push(item);
          })
          .catch(err => console.log(err));
      }
      return arr;
    }, []);
    clearTimeout(loaderTimer);
    setIsRetrievingWallet(false);
    setWalletData(ownFunds);
  }, []);

  React.useEffect(() => {
    const loaderTimer = setTimeout(
      () => setIsRetrievingTransactions(true),
      1000
    );
    api
      .getTransactions()
      .then(data => {
        setTransactionsData(data);
        clearTimeout(loaderTimer);
        setIsRetrievingTransactions(false);
      })
      .catch(() => console.log("error"));
  }, []);

  return (
    <section className="dashboard">
      <div className="dashboard__section">
        <UserData></UserData>
        <UserWallet
          walletData={walletData}
          isRetrievingWallet={isRetrievingWallet}
        ></UserWallet>
      </div>
      <div className="dashboard__section">
        <UserStats
          walletData={walletData}
          transactions={transactionsData.length}
        ></UserStats>
        <UserDeals
          isRetrievingTransactions={isRetrievingTransactions}
        ></UserDeals>
      </div>
    </section>
  );
}

export default Wallet;
