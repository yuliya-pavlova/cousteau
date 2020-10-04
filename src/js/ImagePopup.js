import Popup from './Popup';

export default class ImagePopup extends Popup {
    constructor(popup, openingClass, popupImage) {
        super(popup, openingClass);
        this.popupImage = popupImage;
    }

    open(link) {
        this.popupImage.src = link;
        super.open();
    }
}