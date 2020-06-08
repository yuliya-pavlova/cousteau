class Popup {
    /*REVIEW. Надо исправить. Класс Popup ответственен только за всплывающие окна, за кнопки их открытия и закрытия он неответственен,
    поэтому их не надо и вводить как параметры. Класс Popup должен иметь только 2 метода - один из них добавляет в класслист окна
    модификатор его открытия, другой удаляет, то есть это Ваши методы _open и _close. Метод _setEventListeners определять в этом
    классе нельзя, так как добавление обработчиков на кнопки не есть задача этого класса. Добавление обработчиков событий открытия
    форм на соответствующие кнопки надо производить в точке входа проекта main.js.
    Добавление обработчиков событий закрытия всех трёх всплывающих окон также надо производить в точке входа проекта main.js,
    добавляя эти обработчики на свои элементы крестиков.

    /*REVIEW. Надо исправить. Никакие параметры и переменные с большой буквы не называются. Называются с большой буквы только классы и функции-конструкторы.
     */
    constructor(popup, closeButton, OpeningClass, openButton) {
        this.popup = popup;
        this.closeButton = closeButton;
        this.OpeningClass = OpeningClass;
        this.openButton = openButton;
        this._setEventListeners();
    }

    _open = () => {
        this.popup.classList.add(this.OpeningClass);
    }

    _close = () => {
        this.popup.classList.remove(this.OpeningClass);
    }

    _setEventListeners = () => {
        this.openButton.addEventListener('click', this._open);
        this.closeButton.addEventListener('click', this._close);
    }
}

