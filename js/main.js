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
        .then(res => {
            /*
                Надо исправить: если метод обозначен как приватный (использовано нижнее подчеркивание в начале)
                он не должен вызываться вне класса, нужно убрать нижнее подчеркивание

                Проверить подобное во всем проекте
            */
            const cards = res.map(place => newPlaceFactory(place.name, place.link).create());
            cardList.render(cards);
        })
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
            formNewPlacePopup.open.call(formNewPlacePopup);
            sendButton.setAttribute('disabled', true);
            sendButton.classList.add('button_is-disabled');
            sendButton.classList.remove('button_is-enabled');
        });
        closeButton.addEventListener('click', () => {
            formNewPlacePopup.close.call(formNewPlacePopup);
            form.reset();
            deleteErrors();
        });
        editButton.addEventListener('click', () => {
            formPofilePopup.open.call(formPofilePopup);
            saveButton.setAttribute('disabled', true);
            saveButton.classList.add('button_is-disabled');
            saveButton.classList.remove('button_is-enabled');
        });
        closeButtonPopupProfile.addEventListener('click', () => {
            formPofilePopup.close.call(formPofilePopup);
            formProfile.reset();
            deleteErrors();
            userInfo.setUserInfo();
        });
        closeButtonPopupImg.addEventListener('click', imagePopup.close.bind(imagePopup));
    }

    userInfo.setUserInfo();
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

/*
  Отлично, все критические замечания исправлены
 
  Однако обратил внимание на повторном ревью, что в проекте почти все методы классов обозначены как 
  приватные, т.е. имеют нижнее подчеркивание. Это так же было пропущено предыдущим ревьювером
  Методы обозначенные как приватные должны вызываться только внутри самого класса - другими методами или из конструктора. 
  А сейчас методы обозначенные как приватные вызываются вне класса, например _setUserInfo _create и т.д.
  Про приватные методы можете почитать так же здесь https://learn.javascript.ru/private-protected-properties-methods
  Приватных методов в проекте довольно мало - _getResponseData _like _delete _showPicture 
  Нужно убрать нижнее подчеркивание у названия методов использумых вне класса,
  это довольно просто, так что уверен Вы справитесь самостоятельно и не вижу острой необходимости 
  в ещё одной итерации, однако пожалуйста исправьте это перед сдачей следующецей проектной работы

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/
