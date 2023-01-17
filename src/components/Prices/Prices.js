import React from "react";
import { Link } from "react-router-dom";
import bitstampApi from "../../utils/BitstampApi";

function Prices() {
  const [priceData, setPriceData] = React.useState({});
  const [updateDate, setUpdateDate] = React.useState("");

  React.useEffect(() => {
    function getPriceData() {
      return bitstampApi
        .getTickerData()
        .then(data => {
          data = data.slice(0, 40);
          setPriceData(data);
          setUpdateDate(Date());
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
        Last updated: {updateDate}
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
        {priceData
          ? Array.from(priceData).map(item => {
              return (
                <ul className="prices__line" key={item.pair}>
                  <li className="prices__data prices__data_left"><Link className="prices__link" to={'/exchange'}>{item.pair}</Link></li>
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
          : "No data available"}
      </div>
    </section>
  );
}

export default Prices;
