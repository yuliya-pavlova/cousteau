class CardList {
    constructor(conteiner, cardList) {
        this.conteiner = conteiner;
        this.cardList = cardList;
    }

    _addCard = (card) => {
        this.conteiner.appendChild(card);
    }

    render() {
        this.cardList.forEach( card => {
            this._addCard(card);
        }); 
    }
}