class ImagePopup extends Popup {
    constructor(popup, closeButton, OpeningClass, popupImage) {
        super(popup, closeButton, OpeningClass, document.querySelector('.place-card__image'));
        this.popupImage = popupImage;
        this.cardImage = document.querySelector('.place-card__image');
        this._setEventListeners();
    }

    _open = (event) => {
        this._addImgToPopup(event);
        this.popup.classList.add(this.OpeningClass);
    }

    _addImgToPopup = (event) => {
        //const link = event.target.dataset.link;
        this.popupImage.src = event.target.style.backgroundImage.slice(5, -2);
        //this.popupImage.setAttribute('src' , `${link}`);
    }
    _setEventListeners = () => {
        this.cardImage.addEventListener('click', this._open);
        this.closeButton.addEventListener('click', this._close);
    }
}