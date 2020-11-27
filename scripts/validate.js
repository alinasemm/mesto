function showError (input, errorSpan, errorMessage, inputErrorClass) {
    input.classList.add(inputErrorClass);
    errorSpan.textContent = errorMessage;
};
    
function hideError (input, errorSpan, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    errorSpan.textContent = '';
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

function toggleButtonState(inputs, submitButton, inactiveButtonClass) {
    if (hasInvalidInput(inputs)) {
        submitButton.classList.add(inactiveButtonClass);
    } else {
        submitButton.classList.remove(inactiveButtonClass);
    } 
}

function enableValidation (options) {
    const form = document.querySelector(options.formSelector);
    const inputs = form.querySelectorAll(options.inputSelector);
    const submitButton = form.querySelector(options.submitButtonSelector);

    const inputsArr = Array.from(inputs)
    inputsArr.forEach(function (input) {
        const errorSpan = form.querySelector(`#${input.id}-error`);
        input.addEventListener('input', function () {
            checkInputValidity(input, errorSpan, options.inputErrorClass);
            toggleButtonState(inputsArr, submitButton, options.inactiveButtonClass);
        });
    })
};


enableValidation({
    formSelector: '#popup-profile',
    inputSelector: '.popup__field',
    submitButtonSelector: '#popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__field_error'
})

enableValidation({
    formSelector: '#popup-elements',
    inputSelector: '.popup__field',
    submitButtonSelector: '#popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__field_error'
})