(function () {
    const placesConteiner = document.querySelector('.places-list');

    //formNewPlace
    const form = document.querySelector('.popup__form');

    //formProfile
    const formProfile = document.querySelector('.popup-profile__form');
    const userName = document.querySelector('.user-info__name');
    const job = document.querySelector('.user-info__job');
    const avatar = document.querySelector('.user-info__photo');

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
    const saveButton = document.querySelector('.popup-profile__button');

    //popupImage
    const popupImage = document.querySelector('.popup-image');
    const image = document.querySelector('.popup__image');
    const closeButtonPopupImg = document.querySelector('.popup-image__close');
    const openingClassPopupImage = 'popup-image_is-opened';
    const imagePopup = new ImagePopup(popupImage, openingClassPopupImage, image);

    const cardList = new CardList(placesConteiner);

    const config = {
        url: 'https://praktikum.tk/cohort11',
        headers: {
            authorization: '506783c7-3a7d-4394-94b2-0bb660f308e3',
            'Content-Type': 'application/json'
        }
    }
    const api = new Api(config);

    function newPlaceFactory(name, link) {
        return new Card(name, link, imagePopup.open.bind(imagePopup));
    }

    function deleteErrors() {
        const errors = [...event.target.parentNode.querySelectorAll('.error')];
        errors.forEach(error => error.textContent = '');
    }

    api.getCards()
        /* (исправлено)
            Можно лучше:
            - не разбивать на несколько then если можно без этого обойтись
            - использовать map
            const cards = res.forEach(place => newPlaceFactory(place.name, place.link))
            cardList.render(cards);
        */
        .then(res => {
            const cards = res.map(place => newPlaceFactory(place.name, place.link)._create());
            cardList.render(cards);
        })
        /* (исправлено)
            Можно лучше: экземпляр класс CardList уже создается ниже, лучше использовать его, а 
            карточки передавать как параметр метода render, а не конструктора
        */
        .catch((err) => {
            console.log(err);
        });

    const formNewPlacePopup = new Popup(popupAdd, openingClassPopupAdd, form);
    const formPofilePopup = new Popup(popupProfile, openingClassPopupProfile, formProfile);
    const userInfo = new UserInfo(formProfile, formPofilePopup, deleteErrors, avatar, api, userName, job);
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
        editButton.addEventListener('click', () => {
            formPofilePopup._open.call(formPofilePopup);
            saveButton.setAttribute('disabled', true);
            saveButton.classList.add('button_is-disabled');
            saveButton.classList.remove('button_is-enabled');
        });
        closeButtonPopupProfile.addEventListener('click', () => {
            formPofilePopup._close.call(formPofilePopup);
            formProfile.reset();
            deleteErrors();
            userInfo._setUserInfo();
        });
        closeButtonPopupImg.addEventListener('click', imagePopup._close.bind(imagePopup));
    }

    userInfo._setUserInfo();
    this.setEventListeners();
})();

/*

    Неплохая работа, класс Api создан, запросы на сервер выполняются. Но к организации кода есть замечания:

    Надо исправить:
    - закрывать попап только если запрос на сервер выполнился успешно (исправлено)

    Можно лучше:
    - не разбивать на несколько then если можно без этого обойтись (исправлено)
    - проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод (исправлено)
    - при ответе сервера использовать уже созданный экземпляр класса CardList передавая данные в метод render, а не
    создавать новый экземпляр (исправлено)
    - в ответ на отправку данных сервер возвращает обновленные данные, следует использовать их (исправлено)
*/