import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Prices from "../Prices/Prices";
import Exchange from "../Exchange/Exchange";
import Wallet from "../Wallet/Wallet";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import PopupMenu from "../PopupMenu/PopupMenu";
import PageNotFound from "../PageNotFound/PageNotFound";
import binanceApi from "../../utils/BinanceApi";

function App() {
  const [popupMenuState, setPopupMenuState] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  function handleMenuClick() {
    setPopupMenuState(!popupMenuState);
  }

  function closePopup() {
    setPopupMenuState(!popupMenuState);
  }

  return (
    <div className="app">
      <Header loggedIn={false} onClick={handleMenuClick}/>
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
        <Route
          path="/signup"
          element={
            <>
              <Signup />
            </>
          }
        />
        <Route
          path="*"
          element={<PageNotFound onReturn={() => navigate(-1)} />}
        />
      </Routes>
      <Footer />
      <PopupMenu loggedIn={false} isOpen={popupMenuState} onClose={closePopup} />
      {/* <PopupMenu/> */}
    </div>
  );
}

export default App;
