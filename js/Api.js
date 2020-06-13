class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }


    getCards() {
        return fetch(this.url, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }       
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    }
}