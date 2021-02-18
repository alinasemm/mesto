import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, buttonText, loadingButtonText, onSubmit) {
    super(popupSelector);
    this._onSubmit = onSubmit;
    this._form = this._popup.querySelector(".popup__container");
    this._inputs = Array.from(this._popup.querySelectorAll(".popup__field"));
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
    this._popupSubmitButton = this._form.querySelector(".popup__submit-button");
  }

  _getInputValues() {
    return this._inputs.reduce(function (values, input) {
      values[input.name] = input.value;
      return values;
    }, {});
  }

  _handleSubmit(event) {
    this. _setLoadingStatus(true);
    event.preventDefault();
    const values = this._getInputValues();
    this._onSubmit(values).finally(() => {
      this._setLoadingStatus(false);
      this.close();
    })
  }

  _setLoadingStatus(loadingStatus) {
    this._popupSubmitButton.textContent = loadingStatus ? this._loadingButtonText : this._buttonText;
  }

  setInputValues(values) {
    this._inputs.forEach(function (input) {
      if (Object.keys(values).includes(input.name)) {
        input.value = values[input.name];
      }
    });
  }

  close() {
    super.close();
    this.clearInputs();
  }

  clearInputs() {
    this._inputs.forEach(function (input) {
      input.value= "";
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      this._handleSubmit(event);
    }); 
  }
}

