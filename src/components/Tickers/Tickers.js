import React from "react";
import moment from "moment";
import { activeTickers } from "../../utils/content";
import bitstampApi from "../../utils/BitstampApi";

function Tickers() {
  const [tickersData, setTickersData] = React.useState({});

  React.useEffect(() => {
    function getLandingtickers() {
      return bitstampApi
        .getTickerData()
        .then(data => {
          data = activeTickers.map(item => {
            return data.find(
              ticker => ticker.pair.replace("/", "").toLowerCase() === item
            );
          });
          setTickersData(data);
        })
        .catch(() => console.log("error"));
    }

    getLandingtickers();
    const timer = setInterval(() => getLandingtickers(), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="tickers__container">
      <ul className="tickers__line tickers__line_white-bold-centered">
        <li className="tickers__data">
          Trading Pair
        </li>
        <li className="tickers__data">
          Last transaction price
        </li>
        <li className="tickers__data">
          24h change, %
        </li>
        <li className="tickers__data">
          Last update time
        </li>
      </ul>
      {tickersData
        ? Array.from(tickersData).map(item => {
            return (
              <ul className="tickers__line" key={item.pair}>
                <li className="tickers__data tickers__data_left">
                  {item.pair}
                </li>
                <li className="tickers__data">
                  {item.last}
                </li>
                <li
                  className={`tickers__data ${
                    Number(item.percent_change_24) < 0
                      ? `tickers__data_red`
                      : `tickers__data_green`
                  }`}
                >
                  {item.percent_change_24}
                </li>
                <li className="tickers__data tickers__data_right">
                  {moment(Date(item.timestamp)).format("DD-MMM-YY, HH:mm:ss")}
                </li>
              </ul>
            );
          })
        : "No data available"}
    </div>
  );
}

export default Tickers;
