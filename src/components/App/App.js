import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// Components import
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Prices from "../Prices/Prices";
import Exchange from "../Exchange/Exchange";
import Wallet from "../Wallet/Wallet";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Profile from "../Profile/Profile";
import PopupMenu from "../PopupMenu/PopupMenu";
import PageNotFound from "../PageNotFound/PageNotFound";

// Api import
import * as auth from "../../utils/auth";
import api from "../../utils/MainApi";

// User context and protected route import
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [popupMenuState, setPopupMenuState] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentWallet, setCurrentWallet] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currencyPair, setCurrencyPair] = React.useState({
    cur1: "ETH",
    cur2: "USDT"
  });
  const [isLoginError, setIsLoginError] = React.useState(false);
  const [isSignupError, setIsSignupError] = React.useState(false);
  const [isProfileUpdateError, setIsProfileUpdateError] = React.useState(false);
  const [isTransactionSubmitError, setIsTransactionSubmitError] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Burger menu open and close event processors
  function handleMenuClick() {
    setPopupMenuState(!popupMenuState);
  }

  function closePopup() {
    setPopupMenuState(!popupMenuState);
  }

  // Tocken check upon site opening
  React.useEffect(() => {
    handleTockenCheck(location.pathname);
  }, []);

  const handleTockenCheck = path => {
    if (localStorage.getItem("jwt")) {
      auth.getToken().then(res => {
        if (res) {
          setCurrentUser(res.user);
          setCurrentWallet(res.wallet);
          setIsLoggedIn(true);
          path === ("/login" || "/signup") ? navigate("/") : navigate(path);
        }
      });
    }
  };

  // Signup, login and logout methods call
  const handleSignup = ({ name, email, password }) => {
    auth
      .register({ name, email, password })
      .then(res => {
        if (res.user.email) {
          handleLogin({ email, password });
        }
      })
      .catch(() => setIsSignupError(true));
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then(res => {
        localStorage.setItem("jwt", res.user._id);
        setCurrentUser(res.user);
        setCurrentWallet(res.wallet);
        setIsLoggedIn(true);
        navigate("/wallet");
      })
      .catch(() => setIsLoginError(true));
  };

  const handleLogout = () => {
    auth
      .logout()
      .then(res => {
        if (res) {
          navigate("/");
          localStorage.clear();
          setCurrentUser({});
          setCurrentWallet({});
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoginError(true));
  };

  // User update methods call
  function handleUpdateUser({ name, email }) {
    api
      .patchUserData({ name, email })
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(() => setIsProfileUpdateError(true));
  }

  // Setting currency pair for Exchange page
  function setCurrency(pair) {
    setCurrencyPair({
      cur1: pair.split("/")[0].toUpperCase(),
      cur2: pair.split("/")[1].toUpperCase()
    });
  }

    // Transaction submit. Feedback is an updated wallet.
    function handleTransactionSubmit(data) {
      api
        .postTransaction(data)
        .then(wallet => setCurrentWallet(wallet))
        .catch(() => setIsTransactionSubmitError(true));
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          loggedIn={isLoggedIn}
          onClick={handleMenuClick}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main onPairClick={setCurrency} />
              </>
            }
          />
          <Route
            path="/prices"
            element={
              <>
                <Prices onPairClick={setCurrency} />
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
                  wallet={currentWallet}
                  onTransactionSubmit={handleTransactionSubmit}
                  onTransactionSubmitError={isTransactionSubmitError}
                />
              </>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Wallet wallet={currentWallet}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute loggedIn={!isLoggedIn}>
                <Login onLogin={handleLogin} onLoginError={isLoginError} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute loggedIn={!isLoggedIn}>
                <Signup onSignup={handleSignup} onSignupError={isSignupError} />
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
                  onUpdateError={isProfileUpdateError}
                />
              </ProtectedRoute>
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
        />
        {/* <PopupMenu/> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
