class UserInfo {
    constructor(form, userName, job) {
        this.formProfile = form;
        this.userName = userName;
        this.job = job;
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
        //this.formProfile.addEventListener('input', inputHandler);
    }
}