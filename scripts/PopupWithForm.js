import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__container");
    this._inputs = this._popup.querySelectorAll(".popup__field");
  }

  close() {
    // записываем через super, чтобы метод из родителя сработал
    super.close();
    this._clearInputs();
  }

  _clearInputs(inputs) {
    Array.from(this._inputs).forEach(function (input) {
      input.value= "";
    });
  }

  _getInputValues() {
    console.log("getInputValues", this._inputs);
    return Array.from(this._inputs).map(function (input) {
      return input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = this._getInputValues();
      this._handleSubmit(...values);
      this.close();
    }); 
  }
}

// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.