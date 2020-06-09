class Popup {
    constructor(popup, openingClass) {
        this.popup = popup;
        this.openingClass = openingClass;
    }

    _open() {
        this.popup.classList.add(this.openingClass);
    }

    _close = () => {
        this.popup.classList.remove(this.openingClass);
    }
}

