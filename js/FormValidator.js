class FormValidator {
    static MIN_STRING_LENGTH = 2;
    static MAX_STRING_LENGTH = 30;
    static regexpUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    errorMessage = '';

    static errorMessages = {
        empty: 'Это обязательное поле',
        wrongLength: 'Должно быть от 2 до 30 символов',
        wrongUrl: 'Здесь должна быть ссылка'
    };

    constructor(form) {
        this.form = form;
        this.setEventListeners();
    }

    inputHandler = () => {
        const currentInput = event.target;
        const submitElement = event.currentTarget.querySelector('.button');
        const inputs = [...event.currentTarget.elements].filter(input => (input.type !== 'submit' && input.type !== 'button'));

        this.checkInputValidity(currentInput);
        this.setSubmitButtonState(inputs, submitElement);
    }

    checkInputValidity = (inputElement) => {
        let errorElem = inputElement.parentNode.querySelector(`#${inputElement.name}-error`);
        errorElem.textContent = '';

        if (!this.isValid(inputElement)) {
            errorElem.textContent = FormValidator.errorMessage;
            inputElement.style.marginBottom = '0';
            errorElem.style.marginBottom = '24px';
        } else {
            inputElement.style.marginBottom = '';
            errorElem.style.marginBottom = '';
        }
    }

    isValid = (inputElement) => {
        FormValidator.errorMessage = '';

        if (inputElement.value.length === 0) {
            FormValidator.errorMessage = FormValidator.errorMessages.empty;
            return false;
        }

        if (inputElement.getAttribute('type') !== 'url') {
            if (inputElement.value.length < FormValidator.MIN_STRING_LENGTH || inputElement.value.length > FormValidator.MAX_STRING_LENGTH) {
                FormValidator.errorMessage = FormValidator.errorMessages.wrongLength;
                return false;
            }
        }

        if (inputElement.getAttribute('type') == 'url') {
            if (!inputElement.value.match(FormValidator.regexpUrl)) {
                FormValidator.errorMessage = FormValidator.errorMessages.wrongUrl;
                return false;
            }
        }

        return true;
    }

    setSubmitButtonState = (inputs, submitElement) => {
        if (inputs.every(this.isValid)) {
            submitElement.removeAttribute('disabled');
            submitElement.classList.remove('button_is-disabled');
            submitElement.classList.add('button_is-enabled');
        } else {
            submitElement.setAttribute('disabled', true);
            submitElement.classList.add('button_is-disabled');
            submitElement.classList.remove('button_is-enabled');
        }
    }

    setEventListeners = () => {
        this.form.addEventListener('input', this.inputHandler);
    }

}