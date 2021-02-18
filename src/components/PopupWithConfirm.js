import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__submit-button");
  }

  open (onConfirm) {
    super.open();
    this._onConfirm = onConfirm;
    this._button.addEventListener("click", () => {
      this._onConfirm();
    });
  }

  close () {
    super.close();
    this._button.removeEventListener("click", this._onConfirm);
  }
}