/*REVIEW. Надо исправить. Класс FormPopup, если он вообще нужен, нужно откорректировать вследствии коррекции класса Popup.
Мне кажется, он не нужен вообще. */
class FormPopup extends Popup {
    constructor(popup, openingClass, form) {
        super(popup, openingClass);
        this.form = form;
    }

    // _close() {
    //     closeButton.addEventListener('click', () => {
    //         formNewPlacePopup._close.bind(formNewPlacePopup);
    //         form.reset();
    //         deleteErrors();
    //     });
    // }

    // _setFormEventListeners = () => {
    //     this.form.addEventListener('submit', () => {
    //         this._close();
    //     });
    //}
}