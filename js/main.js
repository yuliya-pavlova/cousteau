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
    sendButton.classList.add('button_is-disabled');
    sendButton.classList.remove('button_is-enabled');
    // sendButton.style.backgroundColor = '#FFFFFF';
    // sendButton.style.color = 'rgba(0, 0, 0, .2)';

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
    sendProfileButton.classList.add('button_is-disabled');
    sendProfileButton.classList.remove('button_is-enabled');

    // sendProfileButton.style.backgroundColor = '#FFFFFF';
    // sendProfileButton.style.color = 'rgba(0, 0, 0, .2)';
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
    /*REVIEW. Нужно лучше. Нужно избавиться в функции deleteCard от глобальной переменной list, сделать её независящей от конкретной размётки.
     К 8-му заданию это обязательно надо сделать, так как в нём это будет обязательным требованием.
    */
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
    const submitElement = event.currentTarget.querySelector('.button');
    const inputs = [...event.currentTarget.elements].filter(input => (input.type !== 'submit' && input.type !== 'button'));

    checkInputValidity(currentInput);

    if (inputs.every(isValid)) {
        submitElement.removeAttribute('disabled');
        submitElement.classList.remove('button_is-disabled');
        submitElement.classList.add('button_is-enabled');
    } else {
        submitElement.setAttribute('disabled', true);
        submitElement.classList.add('button_is-disabled');
        submitElement.classList.remove('button_is-enabled');
    }
}

function checkInputValidity(inputElement) {
    let errorElem = inputElement.parentNode.querySelector(`#${inputElement.name}-error`);
    errorElem.textContent = '';

    if (!isValid(inputElement)) {
        errorElem.textContent = errorMessage;
        inputElement.style.marginBottom = '0';
        errorElem.style.marginBottom = '24px';
    } else {
        inputElement.style.marginBottom = '';
        errorElem.style.marginBottom = '';
    }
}

function isValid(inputElement) {
    errorMessage = '';

    if (inputElement.value.length === 0) {
        errorMessage = errorMessages.empty;
        return false;
    }
/*REVIEW. Нужно лучше. При программировании надо стремиться делать свои функции универсальными, независящими от конкретных исходных данных проекта
(как в алгебре - алгебраическая формула не зависит от конкретных чисел, которые в неё подставляют). В данном случае лучше не использовать название
поля 'link', которое может быть любым и может меняться. Нужно полю ссылки задать тип 'url' и проверять какой у поля тип. К 8-му заданию это
обязательно надо сделать, так как в нём грубое нарушение принципов ООП будет недопустимо.
 */
    if (inputElement.getAttribute('name') !== 'link') {
        if (inputElement.value.length < MIN_STRING_LENGTH || inputElement.value.length > MAX_STRING_LENGTH) {
            errorMessage = errorMessages.wrongLength;
            return false;
        }
    }

    if (inputElement.getAttribute('name') == 'link') {
        if (!inputElement.value.match(regexpUrl)) {
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



/*REVIEW. Резюме.

Хорошая работа.

Весь функционал, требуемый по заданию работает. Сделано дополнительное задание по валидации формы карточки

Соблюдён принцип единственной ответственности функции createCard - она отвечает только за создание элемента карточки,
добавление его к общему списку происходит в другой функции.
Там же предотвращена угроза компьютерной безопасности, так как переменные name и link, в которых могут содержаться вредоносные скрипты
вводятся в свойства DOM-элементов как текст, а не как размётка.
О компьютерной безопасности и функции insertAdjacentElement  и свойстве innerHtml можно прочитать здесь
https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentElement
и здесь https://developer.mozilla.org/ru/docs/Web/API/Element/innerHTML.


Что надо улучшить.

1. Нужно избавиться в функции deleteCard от глобальной переменной list, сделать её независящей от конкретной размётки
(подробности в коде deleteCard ).




4. Не надо использовать название поля 'link'. Нужно полю ссылки задать тип 'url' и проверять какой у поля тип (подробности в коде isValid).

5. По правилам написания кода js требуется, чтобы вызов функции, в каком бы стиле она ни создавалась, происходил в коде после её объявления.
Нужно проверить правильность порядка объявления и вызова всех функций в коде.

Практически все замечания из "Можно лучше" надо исправить к 8-му заданию, так как там эти требования будут обязательными.

Задание принято.

Желаю дальнейших успехов в обучении!

*/