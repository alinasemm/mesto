/*

Старый план:
1) Вынести каждый из 3-х обработчиков в отдельный метод +
2) Конструктор должен принимать данные карточки и селектор её template-элемента
3) Перенести функции, которые относятся к карточке в класс
4) 
*/

//стрелочная функция не может терять this, поэтому используем ее
//bind привязывает контекст функции (сейчас его используем)

// Новый план:
//1) resetForm - публичный метод
//2) 

class FormValidator {
    constructor(options, form) {
        this.form = form;
        this.inputSelector = options.inputSelector;
        this.submitButtonSelector = options.submitButtonSelector;
        this.inactiveButtonClass = options.inactiveButtonClass;
        this.inputErrorClass = options.inputErrorClass;
    }

    _makeButtonInactive(button) {
        button.classList.add(this.inactiveButtonClass);
        button.setAttribute("disabled", "true");
    }

    _makeButtonActive(button) {
        button.classList.remove(this.inactiveButtonClass);
        button.removeAttribute("disabled");
    }

    _toggleButtonState(inputs, submitButton) {
        if (hasInvalidInput(inputs)) {
            this._makeButtonInactive(submitButton);
        } else {
            this._makeButtonActive(submitButton);
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

    _setEventListeners (form, submitButton) {
        const inputs = form.querySelectorAll(this.inputSelector);
    
        const inputsArr = Array.from(inputs)
        inputsArr.forEach((input) => {
            const errorSpan = form.querySelector(`#${input.id}-error`);
            input.addEventListener("input", () => {
                this._checkInputValidity(input, errorSpan);
                this._toggleButtonState(inputsArr, submitButton);
            });
        });
    }

    _handleFormSubmit(event) {
        event.preventDefault();
        this._makeButtonInactive(submitButton);
    }


    enableValidation() {
        const submitButton = form.querySelector(this.submitButtonSelector);
        form.addEventListener("submit", this._handleFormSubmit.bind(this));
        this._setEventListeners(form, submitButton);
    }

    resetForm (inputs, errorSpans, button) {
        inputs.forEach(function (input, i) {
            const errorSpan = errorSpans[i];
            this._hideError(input, errorSpan);
        });
    
        this._makeButtonInactive(button);
    }
}

function hasInvalidInput(inputs) {
    return inputs.some(function (input) {
        return !input.validity.valid;
    });
}

const forms = document.querySelector(".popup_with-validation");
Array.from(forms).forEach((form) => {
    const formValidator = new FormValidator({
        inputSelector: ".popup__field",
        submitButtonSelector: ".popup__submit-button",
        inactiveButtonClass: "popup__submit-button_inactive",
        inputErrorClass: "popup__field_error"
    }, form);
    formValidator.enableValidation();
});
