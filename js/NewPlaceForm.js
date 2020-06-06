class NewPlaceForm {
    constructor(form, createObjCard, cardList) {
        this.form = form;
        this.createObjCard = createObjCard;
        this.cardList = cardList;
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
        //this.formProfile.addEventListener('input', inputHandler);
    }
}