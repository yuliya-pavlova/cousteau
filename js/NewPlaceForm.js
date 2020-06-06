class NewPlaceForm {
    constructor(form, createObjCard, cardList, popup) {
        this.form = form;
        this.createObjCard = createObjCard;
        this.cardList = cardList;
        this.popup = popup;
        this._setEventListeners();
    }

    _addNewPlace = () => {
        event.preventDefault();
    
        const card = this.createObjCard();
        card.name = this.form.elements.name.value;
        card.link = this.form.elements.link.value;
    
        this.cardList.addCard(card._create());
        this.form.reset();
    }

    _setEventListeners = () => {
        this.form.addEventListener('submit', this._addNewPlace);
        this.popup.closeButton.addEventListener('click', () => {
            this.form.reset();
        });
    }
}