const list = document.querySelector('.places-list');
const openButton = document.querySelector('.user-info__button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const form = document.forms.new;
const sendButton = document.querySelector('.popup__button');

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
}

function closeForm() {
    popup.classList.remove('popup_is-opened');
    form.reset();
    sendButton.style.backgroundColor = null;
}

function sendForm() {
    event.preventDefault();

    const name = form.elements.name;
    const link = form.elements.link;

    const newPlace = createCard(name.value, link.value);
    addPlaceToList(newPlace);
    form.reset();
    closeForm();
}

function inputHandler() {
    const name = event.currentTarget.elements.name;
    const link = event.currentTarget.elements.link;

    if (name.value.length === 0 || link.value.length === 0) {
        sendButton.setAttribute('disabled', true);
        sendButton.style.backgroundColor = null;
    } else {
        sendButton.removeAttribute('disabled');
        sendButton.style.backgroundColor = '#ffdd2d';
    }
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

openButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
list.addEventListener('click', likeHandler);
list.addEventListener('click', deleteCard);
form.addEventListener('input', inputHandler);
form.addEventListener('submit', sendForm);

createPlaces();