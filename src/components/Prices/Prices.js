import React from "react";
import { Link } from "react-router-dom";
import bitstampApi from "../../utils/BitstampApi";
import Loader from "../Loader/Loader";

function Prices(props) {
  const [priceData, setPriceData] = React.useState({});
  const [updateDate, setUpdateDate] = React.useState("");
  const [isRetrievingData, setIsRetrievingData] = React.useState(false);

  React.useEffect(() => {
    function getPriceData() {
      const loaderTimer = setTimeout(() => setIsRetrievingData(true), 1000);
      return bitstampApi
        .getTickerData()
        .then(data => {
          data = data.slice(0, 40);
          setPriceData(data);
          setUpdateDate(Date());
          clearTimeout(loaderTimer);
          setIsRetrievingData(false);
        })
        .catch(() => console.log("error"));
    }
    getPriceData();
    const timer = setInterval(() => getPriceData(), 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="prices">
      <p>
        Last updated:{" "}
        {JSON.stringify(priceData) === "{}"
          ? "awaiting update ..."
          : updateDate}
      </p>
      <div className="prices__container">
        <ul className="prices__line prices__line_white-bold-centered">
          <li className="prices__data">Trading Pair</li>
          <li className="prices__data">Buy</li>
          <li className="prices__data">Sell</li>
          <li className="prices__data">Last price</li>
          <li className="prices__data">24h change, %</li>
          <li className="prices__data">Volume, USD</li>
        </ul>
        {!isRetrievingData
          ? Array.from(priceData).map(item => {
              return (
                <ul className="prices__line" key={item.pair}>
                  <li className="prices__data prices__data_left">
                    <Link
                      className="prices__link"
                      to={"/exchange"}
                      onClick={() => props.onPairClick(item.pair.split("/"))}
                    >
                      {item.pair}
                    </Link>
                  </li>
                  <li className="prices__data">{item.bid}</li>
                  <li className="prices__data">{item.ask}</li>
                  <li className="prices__data">{item.last}</li>
                  <li
                    className={`prices__data ${
                      Number(item.percent_change_24) < 0
                        ? `prices__data_red`
                        : `prices__data_green`
                    }`}
                  >
                    {item.percent_change_24}
                  </li>
                  <li className="prices__data prices__data_right">
                    {Intl.NumberFormat("en-GB").format(
                      Number(item.volume).toFixed(2)
                    )}
                  </li>
                </ul>
              );
            })
          : <Loader/>}
      </div>
    </section>
  );
}

export default Prices;
