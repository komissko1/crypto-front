const apiConfig = {
  baseUrl: 'http://localhost:3002/bitstamp/',
  targetUrl: 'https://www.bitstamp.net/api/v2/ticker/',
  tickers: ["usdteur", "btcusdt", "ethusdt", "xrpusdt", "shibusd", "dogeusd"]
};

class BitstampApi {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._targetUrl = apiConfig.targetUrl;
    this._tickers = apiConfig.tickers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getTickerData() {
    return fetch(this._baseUrl, {
      headers: {
      "Content-Type": "application/json"},
    }).then(this._checkResponse);
  }
}

const bitstampApi = new BitstampApi(apiConfig);
export default bitstampApi;
