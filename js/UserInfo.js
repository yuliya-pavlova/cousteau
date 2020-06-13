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

    _setUserInfo = (data) => {
        this.formProfile.elements.name.value = data.name;
        this.formProfile.elements.job.value = data.about;
        this.avatar.style.backgroundImage = `url(${data.avatar})`;
        
        this.userName.textContent = data.name;
        this.job.textContent = data.about;
    }

    _updateUserInfo = () => {
        event.preventDefault();

        this.api.updateUser(this.formProfile.elements.name.value, this.formProfile.elements.job.value);
        this.userName.textContent = this.formProfile.elements.name.value;
        this.job.textContent = this.formProfile.elements.job.value;
    }

    _setEventListeners = () => {
        this.formProfile.addEventListener('submit', () => {
            this._updateUserInfo();
            this.popup._close();
        });
    }
}