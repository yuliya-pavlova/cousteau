(function () {
    const placesConteiner = document.querySelector('.places-list');

    //formNewPlace
/*REVIEW. Можно лучше. В стилевых правилах написания js-кода требуется, чтобы поиск DOM-элементов во всём проекте
осуществлялся одним способом, например только с помощью querySelector (исправлено)*/
    const form = document.querySelector('.popup__form');

    //formProfile
    const formProfile = document.querySelector('.popup-profile__form');
    const userName = document.querySelector('.user-info__name');
    const job = document.querySelector('.user-info__job');

    //popupAddPlace
    const popupAdd = document.querySelector('.popup');
    const openButton = document.querySelector('.user-info__button');
    const closeButton = document.querySelector('.popup__close');
    const openingClassPopupAdd = 'popup_is-opened';
    const sendButton = document.querySelector('.popup__button');

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
    const imagePopup = new ImagePopup(popupImage, openingClassPopupImage, image);

    function newPlaceFactory(name, link) {
        const imagePopup = new ImagePopup(popupImage, openingClassPopupImage, image);
        return new Card(name, link, imagePopup._open.bind(imagePopup));
    }

    function deleteErrors() {
        const errors = [...event.target.parentNode.querySelectorAll('.error')];
        errors.forEach(error => error.textContent = '');
    }

    const cards = [];
    initialCards.forEach(place => {
        /*REVIEW2. Нужно исправить. Нужно устранить дублирование кода. Код  new Card(place.name, place.link, imagePopupFactory) у Вас уже занесён в функцию
        newPlaceFactory, поэтому вместо этого кода и надо вызывать newPlaceFactory(place.name, place.link). (исправлено) */
        const card = newPlaceFactory(place.name, place.link);
        cards.push(card._create());
    });

    const formNewPlacePopup = new Popup(popupAdd, openingClassPopupAdd, form);
    const formPofilePopup = new Popup(popupProfile, openingClassPopupProfile, formProfile);
    const cardList = new CardList(placesConteiner, cards);
     /*REVIEW2. Нужно исправить. Переменные newPlaceForm, formValidator, formProfileValidator нигде не используются, поэтому инструкции new надо
     вызывать без присвоения чему-либо результата их работы. (исправлено)*/
    const userInfo = new UserInfo(formProfile, userName, job, formPofilePopup, deleteErrors);
    new NewPlaceForm(form, newPlaceFactory, cardList, formNewPlacePopup, deleteErrors);
    new FormValidator(form);
    new FormValidator(formProfile);

    setEventListeners = () => {
        openButton.addEventListener('click', () => {
            formNewPlacePopup._open.call(formNewPlacePopup);
            sendButton.setAttribute('disabled', true);
            sendButton.classList.add('button_is-disabled');
            sendButton.classList.remove('button_is-enabled');
        });
        closeButton.addEventListener('click', () => {
            formNewPlacePopup._close.call(formNewPlacePopup);
            form.reset();
            deleteErrors();
        });
        editButton.addEventListener('click', formPofilePopup._open.bind(formPofilePopup));
        closeButtonPopupProfile.addEventListener('click', () => {
            formPofilePopup._close.call(formPofilePopup);
            formProfile.reset();
            deleteErrors();
            userInfo._setUserInfo();
        });
        closeButtonPopupImg.addEventListener('click', imagePopup._close.bind(imagePopup));
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
поэтому их не надо и вводить как параметры (подробный комментарий в файле класса Popup). (исправлено)

2. Класс ImagePopup должен передавать в параметры класса Card обработчик события открытия большого фото, как колбэк-функцию,
и больше ничего передавать туда не должен.
Требуется реорганизация класса ImagePopup по всем замечаниям, которые там есть.
 (подробные комментарии в файле класса ImagePopup). (исправлено)

3. Класс FormPopup, если он вообще нужен, нужно откорректировать в соответствии с  коррекцией класса Popup.
(подробный комментарий в файле класса FormPopup). (исправлено, класс удален)

4. Форма карточки при новом входе в неё после сабмита, открывается с активной кнопкой сабмита.
Нужно в слушателе открытия этой формы делать кнопку сабмита неактивной.(исправлено)

_____________________________________________________________________________________________________________________________________________

REVIEW2. Резюме2.

После исправления ошибок, отмеченных при первой проверке, код проекта стал проще и понятнее, а это гораздо лучше, чем запутанный код.

Что нужно ещё подправить.

1. Устранить дублирование кода (комментарий в коде  цикла initialCards.forEach(place => {... этого файла). (исправлено)

2. Не объявлять переменные newPlaceForm, formValidator, formProfileValidator, которые нигде не используются. (исправлено)

Что можно улучшить.

1. В стилевых правилах написания js-кода требуется, чтобы поиск DOM-элементов во всём проекте осуществлялся одним способом, например
только с помощью querySelector (комментарий в начале кода этого файла).  (исправлено)

2. Лучше в класс Card передавать не экземпляр класса ImagePopup, а его метод открытия окна большого фото, как колбэк-функцию, чтобы эти
классы были совсем независимы друг от друга. (исправлено)

3.Лучше без особой необходимости не использовать статические свойства и методы класса, так как они нужны только тогда, когда необходимо выполнить
какой-то метод класса без создания его экземпляра.


*/