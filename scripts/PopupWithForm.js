import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, onSubmit) {
    super(popupSelector);
    this._onSubmit = onSubmit;
    this._form = this._popup.querySelector(".popup__container");
    this._inputs = this._popup.querySelectorAll(".popup__field");
  }

  _getInputValues() {
    return Array.from(this._inputs).reduce(function (values, input) {
      values[input.name] = input.value;
      return values;
    }, {});
  }

  _handleSubmit (event) {
    event.preventDefault();
    const values = this._getInputValues();
    this._onSubmit(values);
    this.close();
  }

  close() {
    super.close();
    this._clearInputs();
  }

  clearInputs() {
    Array.from(this._inputs).forEach(function (input) {
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

