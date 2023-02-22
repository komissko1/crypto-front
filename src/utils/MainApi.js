const apiConfig = {
  baseUrl: "https://evening-wave-71976.herokuapp.com"
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

  postTransaction({ name1, name2, amount1, amount2, walletId }) {
    return fetch(this._transactionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        creditedCurrency: name1,
        creditedAmount: amount1,
        debitedCurrency: name2,
        debitedAmount: amount2,
        walletId,
      })
    }).then(this._checkResponse);
  }

  getTransactions () {
    return fetch(this._transactionUrl, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  };
}


const mainApi = new Api(apiConfig);
export default mainApi;
