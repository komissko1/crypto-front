import React from "react";
import Loader from "../Loader/Loader";

function UserDeals(props) {
  return (
    <div className="deals">
        {props.isRetrievingData ? <Loader /> : (
      <table className="deals__table">
        <caption className="deals__text">Transactions list</caption>
        <thead>
          <tr>
            <th scope="col" className="deals__text">
              Transaction date
            </th>
            <th scope="col" className="deals__text">
              Credited currency
            </th>
            <th scope="col" className="deals__text">
              Credited amount
            </th>
            <th scope="col" className="deals__text">
              Debited currency
            </th>
            <th scope="col" className="deals__text">
              Debited amount
            </th>
            <th scope="col" className="deals__text">
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody>
          {!props.isRetrievingData && props.transactionsData.map((item) => {
            return (
              <tr className="deals__transaction" key={item._id}>
                <td className="deals__text">{item.dateStamp}</td>
                <td className="deals__text">{item.creditedCurrency}</td>
                <td className="deals__text">{item.creditedAmount}</td>
                <td className="deals__text">{item.debitedCurrency}</td>
                <td className="deals__text">{item.debitedAmount}</td>
                <td className="deals__text">{item._id}</td>
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
