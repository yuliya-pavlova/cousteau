export default class UserInfo {
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

    setUserInfo = () => {
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
                this.userName.textContent = res.name;
                this.job.textContent = res.about;
                this.popup.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _setEventListeners = () => {
        this.formProfile.addEventListener('submit', () => {
            this._updateUserInfo();
        });
    }
}