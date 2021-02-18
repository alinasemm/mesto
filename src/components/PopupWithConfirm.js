import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__container");
  }

  open (onConfirm) {
    super.open();
    this._onConfirm = (event) => {
      event.preventDefault();
      onConfirm();
    };
    this._form.addEventListener("submit", this._onConfirm);
  }

  close () {
    super.close();
    this._form.removeEventListener("submit", this._onConfirm);
  }
}