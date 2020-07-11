export default class CardList {
    constructor(conteiner) {
        this.conteiner = conteiner;
    }

    addCard = (card) => {
        this.conteiner.appendChild(card);
    }

    render(cards) {
        cards.forEach(card => {
            this.addCard(card);
        });
    }
}