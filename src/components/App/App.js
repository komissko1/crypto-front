import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Prices from "../Prices/Prices";
import Exchange from "../Exchange/Exchange";
import Wallet from "../Wallet/Wallet";
import Login from "../Login/Login";
import Register from "../Register/Register";
import binanceApi from "../../utils/BinanceApi";
import bitstampApi from "../../utils/BitstampApi";



function App() {
  const [tickerData, setTickerData] = React.useState({});

  React.useEffect(() => {
    bitstampApi
      .getTickerData()
      .then(data => {
        console.log(data);
        setTickerData(data);
      })
      .catch(() => console.log("error"));
  }, []);

  return (
    <div className="app">
      <Header loggedIn={true} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
            </>
          }
        />
        <Route
          path="/prices"
          element={
            <>
              <Prices />
            </>
          }
        />
        <Route
          path="/exchange"
          element={
            <>
              <Exchange />
            </>
          }
        />
        <Route
          path="/wallet"
          element={
            <>
              <Wallet />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        {/* <Route
          path="*"
          element={<PageNotFound onReturn={() => navigate(-1)} />}
        /> */}
      </Routes>
      <Footer />
      {/* <PopupMenu/> */}
    </div>
  );
}

export default App;
