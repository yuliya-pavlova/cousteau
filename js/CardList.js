class CardList {
    constructor(conteiner, cardList) {
        this.conteiner = conteiner;
        this.cardList = cardList;
    }

    addCard = (card) => {
        this.conteiner.appendChild(card);
    }

    render(imagePopup) {
        this.cardList.forEach( card => {
            this.addCard(card);
        }); 
        imagePopup();
    }
}