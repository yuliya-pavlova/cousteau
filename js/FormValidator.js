class FormValidator {
    static  MIN_STRING_LENGTH = 2;
    static MAX_STRING_LENGTH = 30;
    static regexpUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    errorMessage = '';
    
    constructor(popup) {
        this.popup = popup;
    }

    checkInputValidity = () => {

    }

    setSubmitButtonState = () => {
        
    }

    setEventListeners = () => {
        
    }

}