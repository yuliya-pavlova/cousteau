class ImagePopup extends Popup {
    constructor(popup, closeButton, OpeningClass, popupImage, openButton) {
        super(popup, closeButton, OpeningClass, openButton);
        this.popupImage = popupImage;
        //this.cardImage = null;
        this._setEventListeners();
    }

    _open = (event) => {
        this._addImgToPopup(event);
        this.popup.classList.add(this.OpeningClass);
    }
    
    _addImgToPopup = (event) => {
        this.popupImage.src = event.target.style.backgroundImage.slice(5, -2);
        //const link = event.target.dataset.link;
        //this.popupImage.setAttribute('src' , `${link}`);
    }
    _setEventListeners = () => {
        this.openButton.addEventListener('click', this._open);
        this.closeButton.addEventListener('click', this._close);
    }

    _removeEventListeners = () => {
        this.openButton.removeEventListener('click', this._open);
        this.closeButton.removeEventListener('click', this._close);
    }
}