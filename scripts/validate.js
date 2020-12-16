/*

План:
1) Вынести каждый из 3-х обработчиков в отдельный метод +
2) Конструктор должен принимать данные карточки и селектор её template-элемента
3) Перенести функции, которые относятся к карточке в класс
4) 
*/

//стрелочная функция не может терять this, поэтому используем ее
//bind привязывает контекст функции (сейчас его используем)

//имеет приватные методы, которые обрабатывают форму: 
//проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;

//имеет один публичный метод enableValidation, который включает валидацию формы.


class FormValidator {
    constructor(options) {
        this.formSelector = options.formSelector;
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

    enableValidation() {
        const forms = document.querySelectorAll(this.formSelector);
        Array.from(forms).forEach((form) => {
            const submitButton = form.querySelector(this.submitButtonSelector);
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                this._makeButtonInactive(submitButton);
            });
            this._setEventListeners(form, submitButton);
        });
    }
}

function showError (input, errorSpan, errorMessage, inputErrorClass) {
    input.classList.add(inputErrorClass);
    errorSpan.textContent = errorMessage;
};
    
function hideError (input, errorSpan, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    errorSpan.textContent = "";
};

function checkInputValidity (input, errorSpan, inputErrorClass) {
    if (!input.validity.valid) {
        showError(input, errorSpan, input.validationMessage, inputErrorClass);
    } else {
        hideError(input, errorSpan, inputErrorClass);
    }
};  

function hasInvalidInput(inputs) {
    return inputs.some(function (input) {
        return !input.validity.valid;
    });
}

function makeButtonActive(button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute("disabled");
}

function makeButtonInactive(button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute("disabled", "true");
}

function toggleButtonState(inputs, submitButton, inactiveButtonClass) {
    if (hasInvalidInput(inputs)) {
        makeButtonInactive(submitButton, inactiveButtonClass);
    } else {
        makeButtonActive(submitButton, inactiveButtonClass);
    } 
}

function resetForm (inputs, errorSpans, inputErrorClass, button, inactiveButtonClass) {
    inputs.forEach(function (input, i) {
        const errorSpan = errorSpans[i];
        hideError(input, errorSpan, inputErrorClass);
    });

    makeButtonInactive(button, inactiveButtonClass);
}

function setEventListeners (form, options) {
    const inputs = form.querySelectorAll(options.inputSelector);
    const submitButton = form.querySelector(options.submitButtonSelector);

    const inputsArr = Array.from(inputs)
    inputsArr.forEach(function (input) {
        const errorSpan = form.querySelector(`#${input.id}-error`);
        input.addEventListener("input", function () {
            checkInputValidity(input, errorSpan, options.inputErrorClass);
            toggleButtonState(inputsArr, submitButton, options.inactiveButtonClass);
        });
    });
}

function enableValidation (options) {
    const forms = document.querySelectorAll(options.formSelector);
    Array.from(forms).forEach(function(form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            makeButtonInactive(submitButton, options.inactiveButtonClass);
        });
        setEventListeners(form, options);
    });
};

// enableValidation({
//     formSelector: ".popup_with-validation",
//     inputSelector: ".popup__field",
//     submitButtonSelector: ".popup__submit-button",
//     inactiveButtonClass: "popup__submit-button_inactive",
//     inputErrorClass: "popup__field_error"
// })

const formValidator = new FormValidator({
    formSelector: ".popup_with-validation",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__field_error"
});

formValidator.enableValidation();