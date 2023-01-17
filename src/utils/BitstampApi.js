const apiConfig = {
  baseUrl: 'http://localhost:3002/bitstamp/',
  ticker: ""
};

class BitstampApi {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._ticker = apiConfig.ticker;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getTickerData() {
    return fetch(this._baseUrl+this._ticker, {
      headers: {
      "Content-Type": "application/json"},
    }).then(this._checkResponse);
  }
}

const bitstampApi = new BitstampApi(apiConfig);
export default bitstampApi;
