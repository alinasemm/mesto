export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._crossIcon = this._popup.querySelector('.popup__close-icon');
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  
  _handleClickOnOverlay (event) {
    if (event.target.classList.contains('popup')) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
  }
  
  close() {
    this._popup.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._crossIcon.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (event) => this._handleClickOnOverlay(event));
    this._popup.addEventListener("keydown", (event) => this._handleEscClose(event));  
  }
}