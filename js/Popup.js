class Popup {
    constructor(popup, openButton, closeButton, OpeningClass) {
        this.popup = popup;
        this.openButton = openButton;
        this.closeButton = closeButton;
        this.OpeningClass = OpeningClass;
        this._setEventListeners();
    }
  
    _open = () => {
        this.popup.classList.add(this.OpeningClass);
    }

    _close = () => {
        this.popup.classList.remove(this.OpeningClass);
    }

    _setEventListeners = () => {
        this.openButton.addEventListener('click', this._open);
        this.closeButton.addEventListener('click', this._close);
    }
}

