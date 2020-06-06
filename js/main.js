(function() {
const placesConteiner = document.querySelector('.places-list'); //контейнер

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
const OpeningClassPopupAdd = 'popup_is-opened';

//popupProfile
const popupProfile = document.querySelector('.popup-profile');
const editButton = document.querySelector('.user-info__edit');
const closeButtonPopupProfile = document.querySelector('.popup-profile__close');
const OpeningClassPopupProfile = 'popup-profile_is-opened';

//popupImage
const popupImage = document.querySelector('.popup-image');
const image = document.querySelector('.popup__image');
const closeButtonPopupImg = document.querySelector('.popup-image__close');
const OpeningClassPopupImage = 'popup-image_is-opened';

function imagePopupFactory(openButton){
    return new ImagePopup(popupImage, closeButtonPopupImg, OpeningClassPopupImage, image, openButton);
}

function newPlaceFactory(name, link){
    return new Card(name, link, imagePopupFactory);
}

function deleteErrors() {
    const errors = [...event.target.parentNode.querySelectorAll('.error')];
    errors.forEach(error => error.textContent = '');
}

const cards = [];
initialCards.forEach( place => {
    const card = new Card(place.name, place.link, imagePopupFactory);
    cards.push(card._create());
});

const formNewPlacePopup =   new FormPopup(popupAdd, closeButton, OpeningClassPopupAdd, openButton, form);
const formPofilePopup = new FormPopup(popupProfile, closeButtonPopupProfile, OpeningClassPopupProfile, editButton, formProfile);
const cardList = new CardList(placesConteiner, cards);
const newPlaceForm = new NewPlaceForm(form, newPlaceFactory, cardList, formNewPlacePopup, deleteErrors);
const userInfo = new UserInfo(formProfile, userName, job, formPofilePopup, deleteErrors);
const formValidator = new FormValidator(form);
const formProfileValidator = new FormValidator(formProfile);

userInfo._setUserInfo();
cardList.render(); 
})();