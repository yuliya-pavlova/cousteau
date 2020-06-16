class UserInfo {
    constructor(form, popup, deleteErrors, avatar, api, userName, job) {
        this.formProfile = form;
        this.popup = popup;
        this.deleteErrors = deleteErrors;
        this.avatar = avatar;
        this.api = api;
        this.userName = userName;
        this.job = job;
        this._setEventListeners();
    }

    _setUserInfo = () => {
        this.api.getUser()
            .then(res => {
                this.avatar.style.backgroundImage = `url(${res.avatar})`;
                this.userName.textContent = res.name;
                this.job.textContent = res.about;
                this.formProfile.elements.name.value = res.name;
                this.formProfile.elements.job.value = res.about;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _updateUserInfo = () => {
        event.preventDefault();

        this.api.updateUser(this.formProfile.elements.name.value, this.formProfile.elements.job.value)
            .then(res => {
                /* (исправлено) Можно лучше: в ответ на отправку данных сервер возвращает обновленные данные, следует использовать их */
                this.userName.textContent = res.name;
                this.job.textContent = res.about;
                this.popup._close();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _setEventListeners = () => {
        this.formProfile.addEventListener('submit', () => {
            this._updateUserInfo();
            /* (исправлено)
                Надо исправить: все изменения на странице должны происходить, только после того, как
                сервер ответил подтверждением. Если сервер не ответил, или ответил ошибкой, а
                данные на странице сохраняться, то это может ввести пользователя в заблуждение

                Попап так же нужно закрывать только если сервер ответил подтверждением, иначе
                если запрос завершиться ошибкой, а попап закроется пользователь может подумать
                что данные сохранились, т.е. перенести закрытие попапа в блок then
            */
        });
    }
}