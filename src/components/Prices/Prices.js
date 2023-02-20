import React from "react";
import { Link } from "react-router-dom";
import bitstampApi from "../../utils/BitstampApi";
import Loader from "../Loader/Loader";

function Prices(props) {
  const [priceData, setPriceData] = React.useState({});
  const [updateDate, setUpdateDate] = React.useState("");
  const [isRetrievingData, setIsRetrievingData] = React.useState(false);

  React.useEffect(() => {
    // Function requesting for price data from server
    function getPriceData() {
      const loaderTimer = setTimeout(() => setIsRetrievingData(true), 1000);
      return bitstampApi
        .getTickerData()
        .then((data) => {
          data = data.slice(0, 40);
          setPriceData(data);
          setUpdateDate(Date());
          clearTimeout(loaderTimer);
          setIsRetrievingData(false);
        })
        .catch(() => console.log("error"));
    }

    // Render
    getPriceData();
    const timer = setInterval(() => getPriceData(), 30000);
    return () => clearInterval(timer);
  }, [props.windowSize]);

  return (
    <section className="prices">
      <p>
        Last updated:&nbsp;
        {JSON.stringify(priceData) === "{}"
          ? "awaiting update ..."
          : updateDate}
      </p>
      <div className="prices__container">
      {isRetrievingData ? (
        <Loader />
      ) : (
        <table className="prices__table">
          <thead>
            <tr className="prices__line">
              <th scope="col" className="prices__data">Trading Pair</th>
              <th scope="col" className="prices__data">Buy</th>
              <th scope="col" className="prices__data">Sell</th>
              {props.windowSize > 480 && <th scope="col" className="prices__data">Last price</th>}
              <th scope="col" className="prices__data">24h change, %</th>
              {props.windowSize > 480 && (
                <th scope="col" className="prices__data">Volume, USD</th>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from(priceData).map((item) => {
              return (
                <tr className="prices__line" key={item.pair}>
                  <td className="prices__data prices__data_left">
                    <Link
                      className="prices__link"
                      to={"/exchange"}
                      onClick={() => props.onPairClick(item.pair.split("/"))}
                    >
                      {item.pair}
                    </Link>
                  </td>
                  <td className="prices__data">{item.bid}</td>
                  <td className="prices__data">{item.ask}</td>
                  {props.windowSize > 480 && (
                    <td className="prices__data">{item.last}</td>
                  )}
                  <td
                    className={`prices__data ${
                      Number(item.percent_change_24) < 0
                        ? `prices__data_red`
                        : `prices__data_green`
                    }`}
                  >
                    {item.percent_change_24}
                  </td>
                  {props.windowSize > 480 && (
                    <td className="prices__data prices__data_right">
                      {Intl.NumberFormat("en-GB").format(
                        Number(item.volume).toFixed(2)
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      </div>
    </section>
  );
}

export default Prices;
