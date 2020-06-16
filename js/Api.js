class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
        /*(исправлено)
            Можно лучше: проверка ответа сервера и преобразование из json
            дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                _getResponseData(res) {
                    if (!res.ok) {
                        return Promise.reject(`Ошибка: ${res.status}`); 
                    }
                    return res.json();
                }
            Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
            не используется вне класса Api   
        */
            .then(res => {
                return this._getResponseData(res);
            });
    }
    getUser() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    updateUser(name, job) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
}