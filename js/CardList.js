class CardList {
    constructor(conteiner, cardList) {
        this.conteiner = conteiner;
        this.cardList = cardList;
    }

    addCard(card) {
        this.cardList.push(card);
        this.render();
    }

    render() {
        this.cardList.forEach( card => {
            this.conteiner.appendChild(card);
        }); 
    }
}