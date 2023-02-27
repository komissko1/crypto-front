import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// Import Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Prices from "../Prices/Prices";
import Exchange from "../Exchange/Exchange";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Profile from "../Profile/Profile";
import Faq from "../Policies/Faq";
import Privacy from "../Policies/Privacy";
import Security from "../Policies/Security";

import PopupMenu from "../PopupMenu/PopupMenu";
import PageNotFound from "../PageNotFound/PageNotFound";

// Api import
import * as auth from "../../utils/auth";
import api from "../../utils/MainApi";
import bitstampApi from "../../utils/BitstampApi";

// User context and protected route import
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [popupMenuState, setPopupMenuState] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentWallet, setCurrentWallet] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currencyPair, setCurrencyPair] = React.useState({
    name1: "USDT",
    name2: "BTC",
  });
  const [infoPopupState, setInfoPopupState] = React.useState({
    isOpen: false,
    isError: false,
  });
  const [windowSize, setwindowSize] = React.useState(window.innerWidth);

  const location = useLocation();
  const navigate = useNavigate();

  // Burger menu open and close states
  function handleMenuClick() {
    setPopupMenuState(!popupMenuState);
  }

  function closePopup() {
    setPopupMenuState(!popupMenuState);
  }

  // Window resize tracking to implement in Header and Prices
  React.useEffect(() => {
    var resizeTimer;
    window.onresize = function () {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function () {
        setwindowSize(window.innerWidth);
      }, 200);
    };
  }, [windowSize]);

  // Tocken check upon site opening
  React.useEffect(() => {
    handleTockenCheck(location.pathname);
  }, []);

  const handleTockenCheck = (path) => {
    auth
      .getToken()
      .then((res) => {
        if (res.user) {
          setCurrentUser(res.user);
          setCurrentWallet(res.wallet);
          setIsLoggedIn(true);
          path === ("/login" || "/signup") ? navigate("/") : navigate(path);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  // Signup, login and logout methods call
  const handleSignup = ({ name, email, password }) => {
    auth
      .register({ name, email, password })
      .then((res) => {
        if (res.user.email) {
          handleLogin({ email, password });
        }
      })
      .catch(() => setInfoPopupState({ isOpen: true, isError: true }));
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        setCurrentUser(res.user);
        setCurrentWallet(res.wallet);
        setIsLoggedIn(true);
        navigate("/dashboard");
      })
      .catch(() => setInfoPopupState({ isOpen: true, isError: true }));
  };

  const handleLogout = () => {
    auth
      .logout()
      .then((res) => {
        if (res) {
          navigate("/");
          setCurrentUser({});
          setCurrentWallet({});
          setIsLoggedIn(false);
        }
      })
      .catch(() => setInfoPopupState({ isOpen: true, isError: true }));
  };

  // User update methods call
  function handleUpdateUser({ name, email }) {
    api
      .patchUserData({ name, email })
      .then((userData) => {
        setCurrentUser(userData);
        setInfoPopupState({ isOpen: true, isError: false });
      })
      .catch(() => setInfoPopupState({ isOpen: true, isError: true }));
  }

  // Setting currency pair for Exchange page
  function setExchangePair([name1, name2]) {
    setCurrencyPair({ name1, name2 });
  }

  // Request for rates through BitStamp Exchange API
  async function getRate(currency) {
    try {
      const data = await bitstampApi.getTickerData(
        currency.toLowerCase() + "usd"
      );
      return data.last;
    } catch {
      return setInfoPopupState({ isOpen: false, isError: true });
    }
  }

  // Transaction submit. Feedback is an updated wallet.
  async function handleTransactionSubmit(data) {
    try {
      const response = await api.postTransaction(data);
      setInfoPopupState({ isOpen: true, isError: false });
      return setCurrentWallet(response.wallet);
    } catch {
      return setInfoPopupState({ isOpen: true, isError: true });
    }
  }

  // Handle InfoPopup close and clean errors
  function infoPopupClose(e) {
    if (
      e.target === e.currentTarget ||
      e.target.id === "infoPopupButton" ||
      e.key === "Escape"
    ) {
      setInfoPopupState({ isOpen: false, isError: false });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          loggedIn={isLoggedIn}
          onClick={handleMenuClick}
          onLogout={handleLogout}
          windowSize={windowSize}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main onPairClick={setExchangePair} />
              </>
            }
          />
          <Route
            path="/prices"
            element={
              <>
                <Prices onPairClick={setExchangePair} windowSize={windowSize} />
              </>
            }
          />
          <Route
            path="/exchange"
            element={
              <>
                <Exchange
                  loggedIn={isLoggedIn}
                  activePair={currencyPair}
                  onPairChange={setExchangePair}
                  getRate={getRate}
                  wallet={currentWallet}
                  onTransactionSubmit={handleTransactionSubmit}
                  infoPopupState={infoPopupState}
                  onInfoPopupClose={infoPopupClose}
                />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Dashboard
                  wallet={currentWallet}
                  getRate={getRate}
                  infoPopupState={infoPopupState}
                  onInfoPopupClose={infoPopupClose}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute loggedIn={!isLoggedIn}>
                <Login
                  onLogin={handleLogin}
                  infoPopupState={infoPopupState}
                  onInfoPopupClose={infoPopupClose}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute loggedIn={!isLoggedIn}>
                <Signup
                  onSignup={handleSignup}
                  infoPopupState={infoPopupState}
                  onInfoPopupClose={infoPopupClose}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile
                  onLogout={handleLogout}
                  onUserUpdate={handleUpdateUser}
                  infoPopupState={infoPopupState}
                  onInfoPopupClose={infoPopupClose}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <>
                <Faq />
              </>
            }
          />
          <Route
            path="/privacy"
            element={
              <>
                <Privacy />
              </>
            }
          />
          <Route
            path="/security"
            element={
              <>
                <Security />
              </>
            }
          />
          <Route
            path="*"
            element={<PageNotFound onReturn={() => navigate(-1)} />}
          />
        </Routes>
        <Footer />
        <PopupMenu
          loggedIn={isLoggedIn}
          isOpen={popupMenuState}
          onClose={closePopup}
          onLogout={handleLogout}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
