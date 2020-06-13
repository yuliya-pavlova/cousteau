class NewPlaceForm {
    constructor(form, createObjCard, cardList, popup, deleteErrors) {
        this.form = form;
        this.createObjCard = createObjCard;
        this.cardList = cardList;
        this.popup = popup;
        this.deleteErrors = deleteErrors;
        this._setEventListeners();
    }

    _addNewPlace = () => {
        event.preventDefault();

        const card = this.createObjCard(this.form.elements.name.value, this.form.elements.link.value);

        this.cardList.addCard(card._create());
        this.form.reset();
        this.popup._close();
    }

    _setEventListeners = () => {
        this.form.addEventListener('submit', this._addNewPlace);
    }
}