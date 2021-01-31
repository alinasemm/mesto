export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._crossIcon = this._popup.querySelector('.popup__close-icon');
    this._handleEscClose();
  }

  open() {
    this._popup.classList.add("popup_opened");
  }
  
  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("keydown", this._handleEscClose);
  }

  // _handleEscClose() {
  //   this._popup.addEventListener("keydown", (event) => {
  //     if (event.key === "Escape") {
  //       this.close();
  //     }
  //   });
  // }

  // setEventListeners() {
  //   this._crossIcon.addEventListener("click", () => this.close());
  // }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._crossIcon.addEventListener("click", () => this.close());
    this._popup.addEventListener("keydown", (event) => this._handleEscClose(event));
  }
}

// План - сделать закрытие попапа на оверлей
// Сделать также, как делали с closeicon