const apiConfig = {
  baseUrl: "http://localhost:3002"
};

class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._usersUrl = `${apiConfig.baseUrl}/users/me`;
    this._transactionUrl = `${apiConfig.baseUrl}/transactions`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  patchUserData({ name, email }) {
    return fetch(this._usersUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email
      })
    }).then(this._checkResponse);
  }

  postTransaction({ cur1, cur2, amount1, amount2, walletId }) {
    return fetch(this._transactionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        creditedCurrency: cur1,
        creditedAmount: amount1,
        debitedCurrency: cur2,
        debitedAmount: amount2,
        walletId,
      })
    }).then(this._checkResponse);
  }
}

const mainApi = new Api(apiConfig);
export default mainApi;
