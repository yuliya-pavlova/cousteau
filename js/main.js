(function () {
    const placesConteiner = document.querySelector('.places-list');

    //formNewPlace
    const form = document.forms.new;

    //formProfile
    const formProfile = document.forms.profile;
    const userName = document.querySelector('.user-info__name');
    const job = document.querySelector('.user-info__job');

    //popupAdd
    const popupAdd = document.querySelector('.popup');
    const openButton = document.querySelector('.user-info__button');
    const closeButton = document.querySelector('.popup__close');
    const openingClassPopupAdd = 'popup_is-opened';

    //popupProfile
    const popupProfile = document.querySelector('.popup-profile');
    const editButton = document.querySelector('.user-info__edit');
    const closeButtonPopupProfile = document.querySelector('.popup-profile__close');
    const openingClassPopupProfile = 'popup-profile_is-opened';

    //popupImage
    const popupImage = document.querySelector('.popup-image');
    const image = document.querySelector('.popup__image');
    const closeButtonPopupImg = document.querySelector('.popup-image__close');
    const openingClassPopupImage = 'popup-image_is-opened';

    function imagePopupFactory() {
        return new ImagePopup(popupImage, openingClassPopupImage, image);
    }

    function newPlaceFactory(name, link) {
        return new Card(name, link, imagePopupFactory);
    }

    function deleteErrors() {
        const errors = [...event.target.parentNode.querySelectorAll('.error')];
        errors.forEach(error => error.textContent = '');
    }

    const cards = [];
    initialCards.forEach(place => {
        const card = new Card(place.name, place.link, imagePopupFactory);
        cards.push(card._create());
    });

    //const popup = new Popup(popupAdd, closeButton, OpeningClassPopupAdd, openButton, form);
    const formNewPlacePopup = new FormPopup(popupAdd, openingClassPopupAdd, form);
    const formPofilePopup = new FormPopup(popupProfile, openingClassPopupProfile, formProfile);
    const cardList = new CardList(placesConteiner, cards);
    const newPlaceForm = new NewPlaceForm(form, newPlaceFactory, cardList, formNewPlacePopup, deleteErrors);
    const userInfo = new UserInfo(formProfile, userName, job, formPofilePopup, deleteErrors);
    const formValidator = new FormValidator(form);
    const formProfileValidator = new FormValidator(formProfile);


    setEventListeners = () => {
        openButton.addEventListener('click', formNewPlacePopup._open);
        closeButton.addEventListener('click', formNewPlacePopup._close);
        editButton.addEventListener('click', formPofilePopup._open);
        closeButtonPopupProfile.addEventListener('click', formPofilePopup._close);
        //closeButtonPopupImg.addEventListener('click', ._close);

    }

    userInfo._setUserInfo();
    cardList.render();
    this.setEventListeners();
})();


/*REVIEW. Резюме.

Функционал задания работает, кроме правильной валидации формы карточки.

Требуется разобраться с классом Popup и его дочерними классами, чтобы их работа стала правильной и более прозрачной.

Что надо исправить прежде всего (так как в связи с корректировкой класса Popup и его дочерних, в проект будюут внесены
большие изменения, не исключено, что после этого возникнут ещё критические замечания).

1. Класс Popup ответственен только за всплывающие окна, за кнопки их открытия и закрытия он неответственен,
поэтому их не надо и вводить как параметры (подробный комментарий в файле класса Popup).

2. Класс ImagePopup должен передавать в параметры класса Card обработчик события открытия большого фото, как колбэк-функцию,
и больше ничего передавать туда не должен.
Требуется реорганизация класса ImagePopup по всем замечаниям, которые там есть.
 (подробные комментарии в файле класса ImagePopup).

3. Класс FormPopup, если он вообще нужен, нужно откорректировать в соответствии с  коррекцией класса Popup.
(подробный комментарий в файле класса FormPopup).

4. Форма карточки при новом входе в неё после сабмита, открывается с активной кнопкой сабмита.
Нужно в слушателе открытия этой формы делать кнопку сабмита неактивной.


*/