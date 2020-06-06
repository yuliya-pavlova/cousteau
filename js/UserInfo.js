class UserInfo {
    constructor(form, userName, job, popup) {
        this.formProfile = form;
        this.userName = userName;
        this.job = job;
        this.popup = popup;
        this._setEventListeners();
    }

    _setUserInfo = () => {
        this.formProfile.elements.name.value = this.userName.textContent;
        this.formProfile.elements.job.value = this.job.textContent;
    } 

    _updateUserInfo = () => {
        event.preventDefault();

        this.userName.textContent = this.formProfile.elements.name.value;
        this.job.textContent = this.formProfile.elements.job.value;
    }

    _setEventListeners = () => {
        this.formProfile.addEventListener('submit', this._updateUserInfo);
        this.popup.closeButton.addEventListener('click', () => {
            this.formProfile.reset();
            this._setUserInfo();
        });
    }
}