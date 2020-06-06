class FormPopup extends Popup {
    constructor(popup, closeButton, OpeningClass, openButton, form) {
        super(popup, closeButton, OpeningClass, openButton);
        this.form = form;
        this._setFormEventListeners();
    }

    _setFormEventListeners = () => {
        this.form.addEventListener('submit', () => {
            this._close();
        });

        // this.form.addEventListener('submit', () => {
        //     this._close();
        // });
    }
}