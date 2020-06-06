class Popup {
    constructor(popup, closeButton, OpeningClass, openButton) {
        this.popup = popup;
        this.closeButton = closeButton;
        this.OpeningClass = OpeningClass;
        this.openButton = openButton;
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

