const apiConfig = {
  baseUrl: 'https://evening-wave-71976.herokuapp.com/bitstamp/',
  // baseUrl: 'http://localhost:3002/bitstamp/',
};

class BitstampApi {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getTickerData(currency) {
    return fetch(this._baseUrl+`${!currency ? "" : currency}`, {
      headers: {
      "Content-Type": "application/json"},
    }).then(this._checkResponse);
  }
}

const bitstampApi = new BitstampApi(apiConfig);
export default bitstampApi;
