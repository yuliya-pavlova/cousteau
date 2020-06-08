/*REVIEW. Надо исправить. Класс FormPopup, если он вообще нужен, нужно откорректировать вследствии коррекции класса Popup.
Мне кажется, он не нужен вообще. */
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
    }
}