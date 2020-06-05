class FormPopup extends Popup {
    constructor(popup, openButton, closeButton, OpeningClass) {
    super(popup, openButton, closeButton, OpeningClass);
        this._setEventListeners();
    }
}