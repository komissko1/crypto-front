import React from "react";
import { Link } from "react-router-dom";
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
      {isRetrievingData ? (
        <Loader />
      ) : (
        <table className="tickers__table">
          <thead>
            <tr>
              <th scope="col" className="tickers__data">
                Trading Pair
              </th>
              <th scope="col" className="tickers__data">
                Last transaction price
              </th>
              <th scope="col" className="tickers__data">
                24h change, %
              </th>
              <th scope="col" className="tickers__data">
                Last update time
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from(tickersData).map((item) => {
              return (
                <tr className="tickers__line" key={item.pair}>
                  <td className="tickers__data tickers__data_left">
                    <Link
                      className="tickers__link"
                      to={"/exchange"}
                      onClick={() =>
                        props.onPairClick(item.pair.split("/"))
                      }
                    >
                      {item.pair}
                    </Link>
                  </td>
                  <td className="tickers__data">{item.last}</td>
                  <td
                    className={`tickers__data ${
                      Number(item.percent_change_24) < 0
                        ? `tickers__data_red`
                        : `tickers__data_green`
                    }`}
                  >
                    {item.percent_change_24}
                  </td>
                  <td className="tickers__data">
                    {Intl.DateTimeFormat("en-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(item.timestamp + 300)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tickers;
