class ImagePopup extends Popup {
    /*REVIEW. Надо исправить. Как Вы уже, наверное, поняли из комментария в классе Popup, класс ImagePopup должен иметь не больше 3-х
    параметров - Вы лучше знаете свой код и разберётесь с этим.

    Задача класса ImagePopup - передать в параметры класса Card обработчик события открытия большого фото. В классе Card этот обработчик
    должен быть добавлен на элемент с классом "place-card__image", аналогично тому, как Вы в этом классе добавляете обработчики лайка и
    удаления камрточки. В этом же классе этот обработчик должен удаляться при удалении карточки.

     */
    constructor(popup, closeButton, OpeningClass, popupImage, openButton) {
        super(popup, closeButton, OpeningClass, openButton);
        this.popupImage = popupImage;
        this._setEventListeners();
    }


    /*REVIEW. Надо лучше. Лучше обработчику события открытия большого фото задать параметр не event, а переменную link, например, которая сможет в классе Card
    принять аргумент this.link, тогда можно будет записать выражение this.popupImage.src = link и не делать никаких вычислений src.*/
    _open = (event) => {
        this._addImgToPopup(event);
        /*REVIEW. Надо исправить. Нижеследующая строчка полностью повторяет код метода _open родительского класса, поэтому его тут и надо вызывать
        во избежание дублирования кода. */
        this.popup.classList.add(this.OpeningClass);
    }

    _addImgToPopup = (event) => {
        this.popupImage.src = event.target.style.backgroundImage.slice(5, -2);
    }

   /*REVIEW. Надо исправить. Определение метода _removeEventListeners в этом классе совершенно ни к чему, так как обработчик события открытия большого фото
   будет удаляться в классе Card. Удалять же обработчики открытия окон форм и закрытия всех всплывающих окон ни к чему, так как они нужны на протяжении всего
   сеанса работы пользователя на сайте.
   */
    _removeEventListeners = () => {
        this.openButton.removeEventListener('click', this._open);
        this.closeButton.removeEventListener('click', this._close);
    }
}