import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../Loader/Loader";
import { activeTickers } from "../../utils/content";
import bitstampApi from "../../utils/BitstampApi";

function Tickers(props) {
  const [tickersData, setTickersData] = React.useState({});
  const [isRetrievingData, setIsRetrievingData] = React.useState(false);

  React.useEffect(() => {
    function getLandingtickers() {
      const loaderTimer = setTimeout(() => setIsRetrievingData(true), 1000);
      return bitstampApi
        .getTickerData()
        .then((data) => {
          data = activeTickers.map((item) => {
            return data.find(
              (ticker) => ticker.pair.replace("/", "").toLowerCase() === item
            );
          });
          setTickersData(data);
          clearTimeout(loaderTimer);
          setIsRetrievingData(false);
        })
        .catch(() => console.log("error"));
    }

    getLandingtickers();
    const renewData = setInterval(() => getLandingtickers(), 5000);
    return () => clearInterval(renewData);
  }, []);

  return (
    <div className="tickers__container">
      <ul className="tickers__line tickers__line_white-bold-centered">
        <li className="tickers__data">Trading Pair</li>
        <li className="tickers__data">Last transaction price</li>
        <li className="tickers__data">24h change, %</li>
        <li className="tickers__data">Last update time</li>
      </ul>
      {isRetrievingData ? (
        <Loader />
      ) : (
        Array.from(tickersData).map((item) => {
          return (
            <ul className="tickers__line" key={item.pair}>
              <li className="tickers__data tickers__data_left">
                <Link
                  className="tickers__link"
                  to={"/exchange"}
                  onClick={() =>
                    props.onPairClick(item.pair.toLowerCase().split("/"))
                  }
                >
                  {item.pair}
                </Link>
              </li>
              <li className="tickers__data">{item.last}</li>
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
                {Intl.DateTimeFormat("en-DE", {
                  hour: '2-digit', minute: '2-digit', second: '2-digit',
                }).format(item.timestamp+300)}
              </li>
            </ul>
          );
        })
      )}
    </div>
  );
}

export default Tickers;
