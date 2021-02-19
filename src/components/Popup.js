export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector, focus);
    this._crossIcon = this._popup.querySelector('.popup__close-icon');
    this._handleEscClose = this._handleEscClose.bind(this);
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
    this._popup.addEventListener("keydown", this._handleEscClose);

    const animationTime = 150
    setTimeout(() => this._popup.focus(), animationTime + 1);
  }
  
  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("keydown", this._handleEscClose);  
  }

  setEventListeners() {
    this._crossIcon.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (event) => this._handleClickOnOverlay(event));
  }
}