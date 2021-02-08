export default class FormValidator {
  constructor(options, form) {
    this.form = form;
    this.submitButton = this.form.querySelector(options.submitButtonSelector);

    this._inputs = Array.from(this.form.querySelectorAll(options.inputSelector));
    this._inputsWithErrorSpans = this._inputs.map((input) => this._addErrorSpanToInput(input));

    this.inactiveButtonClass = options.inactiveButtonClass;
    this.inputErrorClass = options.inputErrorClass;
  }


  _addErrorSpanToInput (input) {
    const errorSpan = this.form.querySelector(`#${input.id}-error`);
    return { input, errorSpan };
  }

  _makeButtonInactive() {
    this.submitButton.classList.add(this.inactiveButtonClass);
    this.submitButton.setAttribute("disabled", "true");
  }

  _makeButtonActive() {
    this.submitButton.classList.remove(this.inactiveButtonClass);
    this.submitButton.removeAttribute("disabled");
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
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
    this._inputsWithErrorSpans.forEach(({ input, errorSpan }) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input, errorSpan);
        this._toggleButtonState();
      });
    });
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    this._makeButtonInactive();
  }

  _hasInvalidInput() {
    return this._inputs.some(function (input) {
      return !input.validity.valid;
    });
  }

  enableValidation() {
    this.form.addEventListener("submit", this._handleFormSubmit.bind(this));
    this._setEventListeners();
  }

  resetForm () {
    this._inputsWithErrorSpans.forEach(({ input, errorSpan }) => {
      this._hideError(input, errorSpan);
    });

    this._makeButtonInactive();
  }
}
