class Card {
    constructor(place) {
        this.name = place.name;  
        this.link = place.link;
        this.card = null;
        //this.remove = this.remove.bind(this);
        //this.setEventListeners();
    }

    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
        }
    }

    remove(event) {
        const placesConteiner = document.querySelector('.places-list');
        const card = event.target.closest('.place-card');
        placesConteiner.removeChild(card);
    }

    create() {
        const template = `
        <div class="place-card">
            <div class="place-card__image">
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <button class="place-card__like-icon"></button>
            </div>
        </div>
        `;
        const element = document.createElement('div');
        element.insertAdjacentHTML('afterbegin', template);

        const card = element.firstElementChild;
        card.querySelector('.place-card__name').textContent =  this.name;
        card.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
        this.card = card;
        this.setEventListeners();
        return card;
    }

    setEventListeners = () => {
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);

    }

    removeEventListeners () {

    }


}