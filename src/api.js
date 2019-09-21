const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2'

class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserName() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        } else {
          console.log('Кажется сайт не отвечает или неправильный урл');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  setUserName(username, about) {
    fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: username,
        about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log('Кажется сайт не отвечает или неправильный урл');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: '9b5510e1-e0ed-4f9f-8a0a-8043e75d5894',
    'Content-Type': 'application/json'
  }
});

