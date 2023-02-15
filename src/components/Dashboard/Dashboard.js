import React from "react";
import UserData from "../UserData/UserData";
import UserWallet from "../UserWallet/UserWallet";
import UserStats from "../UserStats/UserStats";
import UserDeals from "../UserDeals/UserDeals";
import { currencyList } from "../../utils/currencyList";
import api from "../../utils/MainApi";

function Dashboard(props) {
  const [walletData, setWalletData] = React.useState({});
  const [transactionsData, setTransactionsData] = React.useState([]);
  const [isRetrievingData, setIsRetrievingData] = React.useState(false);
    React.useState(false);

  async function setOwnFunds(ownFunds) {
    let ownFundsUsd = 0;
    await Promise.all(
      ownFunds.map(async (item) => {
        item.amount = props.wallet.currencies[item.symbol];
        const rate = async () => await props.getRate(item.symbol);
        item.amountInUsd = item.amount * (await rate());
        ownFundsUsd = ownFundsUsd + item.amountInUsd;
      })
    ).then((data) => data);
    return {ownFunds, ownFundsUsd}
  }

  React.useEffect(() => {
    const loaderTimer = setTimeout(() => setIsRetrievingData(true), 100);
    const ownFunds = currencyList.filter((item) =>
      Object.keys(props.wallet.currencies).includes(item.symbol)
    );
    Promise.all([setOwnFunds(ownFunds), api.getTransactions()])
      .then(([walletState, transactions]) => {
        clearTimeout(loaderTimer);
        setIsRetrievingData(false);
        setTransactionsData(transactions);
        setWalletData(walletState);
      })
      .catch(() => console.log("error"));
  }, [props.wallet]);

  return (
    <section className="dashboard">
      <div className="dashboard__section">
        <UserData></UserData>
        <UserWallet
          walletData={walletData.ownFunds}
          isRetrievingData={isRetrievingData}
        ></UserWallet>
      </div>
      <div className="dashboard__section">
        <UserStats
          totalFunds={walletData.ownFundsUsd}
          transactions={transactionsData.length}
        ></UserStats>
        <UserDeals
          isRetrievingData={isRetrievingData}
          transactionsData={transactionsData}
        ></UserDeals>
      </div>
    </section>
  );
}

export default Dashboard;
