const apiConfig = {
  baseUrl: 'http://localhost:3002',
};

class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._usersUrl = `${apiConfig.baseUrl}/users/me`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  patchUserData({name, email}) {
    return fetch(this._usersUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }
}

const mainApi = new Api(apiConfig);
export default mainApi;
