class Card {
    constructor(name, link, createImagePopup) {
        this.name = name;  
        this.link = link;
        this.createImagePopup = createImagePopup;
        this.imagePopup = null;
    }

    _like = (event) => {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    _delete = (event) => {
        event.stopPropagation();
        this._removeEventListeners();
        this._view.remove();
    }

    _showPicture = () => {
        this.imagePopup._open(this.link);
    }

    _create() {
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

        this._view = element.firstElementChild;
        this._view.querySelector('.place-card__name').textContent =  this.name;
        this._view.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
        
        this.imagePopup = this.createImagePopup(this._view.querySelector('.place-card__image'));
        this._setEventListeners();
        return this._view;
    }

    _setEventListeners = () => {
        this._view.querySelector('.place-card__delete-icon').addEventListener('click', this._delete);
        this._view.querySelector('.place-card__like-icon').addEventListener('click', this._like);
        this._view.querySelector('.place-card__image').addEventListener('click', this._showPicture);
    }

    _removeEventListeners  = () => {
        this._view.querySelector('.place-card__delete-icon').removeEventListener('click', this._delete);
        this._view.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
        this._view.querySelector('.place-card__image').removeEventListener('click', this._showPicture);
    }

    // _removeEventListeners = () => {
    //     this.openButton.removeEventListener('click', this._open);
    //     this.closeButton.removeEventListener('click', this._close);
    // }
}