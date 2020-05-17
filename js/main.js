const list = document.querySelector('.places-list');
const openButton = document.querySelector('.user-info__button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const form = document.forms.new;
const sendButton = document.querySelector('.popup__button');
const editButton = document.querySelector('.user-info__edit');
const popupProfile = document.querySelector('.popup-profile');
const sendProfileButton = document.querySelector('.popup-profile__button');
const closeButtonPopupProfile = document.querySelector('.popup-profile__close');
const userName = document.querySelector('.user-info__name');
const job = document.querySelector('.user-info__job');
const formProfile = document.forms.profile;
const popupImage = document.querySelector('.popup-image');
const image = document.querySelector('.popup__image');
const closeButtonPopupImg = document.querySelector('.popup-image__close');
const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 30;
const regexpUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
let errorMessage = '';

const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка'
};

function createCard(name, link) {
    const template = `
    <div class="place-card">
        <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <button class="place-card__like-icon"></button>
        </div>
    </div>
    `;
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', template);

    const card = element.firstElementChild;
    card.querySelector('.place-card__name').textContent = name;
    card.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;

    return card;
}

function addPlaceToList(place) {
    list.appendChild(place);
}

function createPlaces() {
    initialCards.forEach(function (place) {
        const newPlace = createCard(place.name, place.link);
        addPlaceToList(newPlace);
    });
}

function openForm() {
    popup.classList.add('popup_is-opened');
    sendButton.setAttribute('disabled', true);
    sendButton.style.cursor = 'default';
}

function closeForm() {
    form.reset();
    popup.classList.remove('popup_is-opened');
    deleteErrors();

    sendButton.setAttribute('disabled', true);
    sendButton.style.backgroundColor = '#FFFFFF';
    sendButton.style.color = 'rgba(0, 0, 0, .2)';
    
}

function deleteErrors() {
    const errors = [...event.target.parentNode.querySelectorAll('.error')];
    errors.forEach(error => error.textContent = ''); 
}


function closeProfile() {
    formProfile.reset();
    popupProfile.classList.remove('popup-profile_is-opened');
    deleteErrors();

    sendProfileButton.setAttribute('disabled', true);
    sendProfileButton.style.backgroundColor = '#FFFFFF';
    sendProfileButton.style.color = 'rgba(0, 0, 0, .2)';
}

function sendForm() {
    event.preventDefault();

    const name = form.elements.name;
    const link = form.elements.link;

    const newPlace = createCard(name.value, link.value);
    addPlaceToList(newPlace);
    closeForm();
}

function deleteCard(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
        const card = event.target.closest('.place-card');
        list.removeChild(card);
    }
}

function likeHandler(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }
}

function editForm() {
    formProfile.reset();
    sendProfileButton.setAttribute('disabled', true);
    sendProfileButton.style.cursor = 'default';
    popupProfile.classList.add('popup-profile_is-opened');

    formProfile.elements.name.value = userName.textContent;
    formProfile.elements.job.value = job.textContent;
}

function sendProfile() {
    event.preventDefault();

    userName.textContent = formProfile.elements.name.value;
    job.textContent = formProfile.elements.job.value;
    closeProfile()
}

function showImage() {
    if (event.target.classList.contains('place-card__image')) {
        popupImage.classList.add('popup-image_is-opened');
        image.src = event.target.style.backgroundImage.slice(5, -2);
    }
}

function closeImage() {
    popupImage.classList.remove('popup-image_is-opened');
}

function inputHandler(event) {
    const currentInput = event.target;
    const submit = event.currentTarget.querySelector('.button');
    const inputs = [...event.currentTarget.elements].filter(input => (input.type !== 'submit' && input.type !== 'button'));

    checkInputValidity(currentInput);

    if (inputs.every(isValid)) {
        submit.removeAttribute('disabled');
        submit.style.backgroundColor = '#000000';
        submit.style.color = '#FFFFFF';
        submit.style.cursor = '';
    } else {
        submit.setAttribute('disabled', true);
        submit.style.cursor = 'default';
        submit.style.backgroundColor = '#FFFFFF';
        submit.style.color = 'rgba(0, 0, 0, .2)';
    }
}

function checkInputValidity(input) {
    let errorElem = input.parentNode.querySelector(`#${input.name}-error`);
    errorElem.textContent = '';

    if (!isValid(input)) {
        errorElem.textContent = errorMessage;
        input.style.marginBottom = '0';
        errorElem.style.marginBottom = '24px';
    } else {
        input.style.marginBottom = '';
        errorElem.style.marginBottom = '';
    }
}

function isValid(input) {
    errorMessage = '';

    if (input.value.length === 0) {
        errorMessage = errorMessages.empty;
        return false;
    }

    if (input.getAttribute('name') !== 'link') {
        if (input.value.length < MIN_STRING_LENGTH || input.value.length > MAX_STRING_LENGTH) {
            errorMessage = errorMessages.wrongLength;
            return false;
        }
    } 

    if (input.getAttribute('name') == 'link') {
        if (!input.value.match(regexpUrl)) {
            errorMessage = errorMessages.wrongUrl;
            return false;
        }
    }
    
    return true;
}    

openButton.addEventListener('click', openForm);
editButton.addEventListener('click', editForm);
closeButton.addEventListener('click', closeForm);
closeButtonPopupProfile.addEventListener('click', closeProfile);
list.addEventListener('click', likeHandler);
list.addEventListener('click', deleteCard);
list.addEventListener('click', showImage);
closeButtonPopupImg.addEventListener('click', closeImage);
form.addEventListener('input', inputHandler);
form.addEventListener('submit', sendForm);
formProfile.addEventListener('submit', sendProfile);
formProfile.addEventListener('input', inputHandler);

createPlaces();