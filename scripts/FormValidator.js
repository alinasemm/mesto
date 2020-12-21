export default class FormValidator {
    constructor(options, form) {
        this.form = form;
        this.submitButton = this.form.querySelector(options.submitButtonSelector);
        this.inputSelector = options.inputSelector;
        this.inactiveButtonClass = options.inactiveButtonClass;
        this.inputErrorClass = options.inputErrorClass;
    }

    _makeButtonInactive() {
        this.submitButton.classList.add(this.inactiveButtonClass);
        this.submitButton.setAttribute("disabled", "true");
    }

    _makeButtonActive() {
        this.submitButton.classList.remove(this.inactiveButtonClass);
        this.submitButton.removeAttribute("disabled");
    }

    _toggleButtonState(inputs) {
        if (this._hasInvalidInput(inputs)) {
            this._makeButtonInactive();
        } else {
            this._makeButtonActive();
        } 
    }

    _showError (input, errorSpan, errorMessage) {
        input.classList.add(this.inputErrorClass);
        errorSpan.textContent = errorMessage;
    };

    _hideError (input, errorSpan) {
        input.classList.remove(this.inputErrorClass);
        errorSpan.textContent = "";
    };

    _checkInputValidity (input, errorSpan) {
        if (!input.validity.valid) {
            this._showError(input, errorSpan, input.validationMessage);
        } else {
            this._hideError(input, errorSpan);
        }
    }

    _setEventListeners () {
        const inputs = this.form.querySelectorAll(this.inputSelector);
    
        const inputsArr = Array.from(inputs)
        inputsArr.forEach((input) => {
            const errorSpan = this.form.querySelector(`#${input.id}-error`);
            input.addEventListener("input", () => {
                this._checkInputValidity(input, errorSpan);
                this._toggleButtonState(inputsArr);
            });
        });
    }

    _handleFormSubmit(event) {
        event.preventDefault();
        this._makeButtonInactive();
    }

    _hasInvalidInput(inputs) {
        return inputs.some(function (input) {
            return !input.validity.valid;
        });
    }

    enableValidation() {
        this.form.addEventListener("submit", this._handleFormSubmit.bind(this));
        this._setEventListeners();
    }

    resetForm (inputs, errorSpans) {
        inputs.forEach((input, i) => {
            const errorSpan = errorSpans[i];
            this._hideError(input, errorSpan);
        });
    
        this._makeButtonInactive();
    }
}
