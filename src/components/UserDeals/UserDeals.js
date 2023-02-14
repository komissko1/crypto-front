import React from "react";
import Loader from "../Loader/Loader";

function UserDeals(props) {
  return (
    <div className="deals">
      <table className="wallet__table">
        <caption className="wallet__text">Transactions list</caption>
        <thead>
          <tr>
            <th scope="col" className="wallet__text">
              Transaction date
            </th>
            <th scope="col" className="wallet__text">
              Credited currency
            </th>
            <th scope="col" className="wallet__text">
              Credited amount
            </th>
            <th scope="col" className="wallet__text">
              Debited currency
            </th>
            <th scope="col" className="wallet__text">
              Debited amount
            </th>
            <th scope="col" className="wallet__text">
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody>
          {props.isRetrievingTransactions ? (
            <Loader />
          ) : (
            props.transactionsData.map((item) => {
              return (
                <tr className="deals__transaction" key={item._id}>
                  <td className="wallet__text">{item.dateStamp}</td>
                  <td className="wallet__text">{item.creditedCurrency}</td>
                  <td className="wallet__text">{item.creditedAmount}</td>
                  <td className="wallet__text">{item.debitedCurrency}</td>
                  <td className="wallet__text">{item.debitedAmount}</td>
                  <td className="wallet__text">{item._id}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserDeals;
