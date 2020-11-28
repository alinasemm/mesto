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

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        makeButtonInactive(submitButton, options.inactiveButtonClass);
    });
}

function enableValidation (options) {
    const forms = document.querySelectorAll(options.formSelector);
    Array.from(forms).forEach(function(form) {
        setEventListeners(form, options);
    });
};

enableValidation({
    formSelector: ".popup_with-validation",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__field_error"
})