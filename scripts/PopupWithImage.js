import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector('#popup-preview-photo');
    this._photoName = this._popup.querySelector('#popup-preview-name');
  }

  open(name, src) {
    this._photo.src = src;
    this._photo.alt= name;
    this._photoName.textContent = name;

    super.open();
  }
}