import React from "react";
import UserData from "../UserData/UserData";
import UserWallet from "../UserWallet/UserWallet";
import UserStats from "../UserStats/UserStats";
import UserDeals from "../UserDeals/UserDeals";
import { currencyList } from "../../utils/currencyList";
import api from "../../utils/MainApi";

function Dashboard(props) {
  const [transactionsData, setTransactionsData] = React.useState([]);
  const [isRetrievingWallet, setIsRetrievingWallet] = React.useState(false);
  const [isRetrievingTransactions, setIsRetrievingTransactions] =
    React.useState(false);
  const [walletData, setWalletData] = React.useState([]);

  async function setOwnFunds(ownFunds) {
      await Promise.all(
        ownFunds.map( async (item) => {
          item.amount = props.wallet.currencies[item.symbol];
          const rate = async () => await props.getRate(item.symbol)
          item.amountInUsd = item.amount * await rate();
        })
      ).then((data) => data);
    return ownFunds;
  }

  React.useEffect(() => {
    const loaderTimer = setTimeout(() => setIsRetrievingWallet(true), 500);
    const ownFunds = currencyList.filter((item) =>
      Object.keys(props.wallet.currencies).includes(item.symbol)
    );
    const walletState = async () => {
      const walletState = await setOwnFunds(ownFunds);
      setWalletData(walletState);
      clearTimeout(loaderTimer);
      setIsRetrievingWallet(false);
    };
    walletState();
  }, [props.wallet]);

  React.useEffect(() => {
    const loaderTimer = setTimeout(
      () => setIsRetrievingTransactions(true),
      1000
    );
    api
      .getTransactions()
      .then((data) => {
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
          transactionsData={transactionsData}
        ></UserDeals>
      </div>
    </section>
  );
}

export default Dashboard;
