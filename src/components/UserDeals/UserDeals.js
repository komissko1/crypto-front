import React from "react";
import Loader from "../Loader/Loader";

function UserDeals(props) {
  return (
    <div className="deals">
      {props.isRetrievingData ? (
        <Loader />
      ) : (
        <table className="deals__table">
          <caption className="deals__text">Transactions list</caption>
          <thead>
            <tr>
              <th scope="col" className="deals__column-title">
                Transaction date
              </th>
              <th scope="col" className="deals__column-title">
                Credited currency
              </th>
              <th scope="col" className="deals__column-title">
                Credited amount
              </th>
              <th scope="col" className="deals__column-title">
                Debited currency
              </th>
              <th scope="col" className="deals__column-title">
                Debited amount
              </th>
            </tr>
          </thead>
          <tbody>
            {!props.isRetrievingData &&
              props.transactionsData.map((item) => {
                return (
                  <tr className="deals__transaction" key={item._id}>
                    <td className="deals__text">
                      {Intl.DateTimeFormat("en-Uk", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(Date.parse(item.dateStamp))}
                    </td>
                    <td className="deals__text">{item.creditedCurrency}</td>
                    <td className="deals__text">{item.creditedAmount}</td>
                    <td className="deals__text">{item.debitedCurrency}</td>
                    <td className="deals__text">{item.debitedAmount}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserDeals;
