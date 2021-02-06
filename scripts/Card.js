export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(this.templateSelector).content;
    return template.cloneNode(true);
  }

  _findElements() {
    this.photoElement = this.cardElement.querySelector(".elements__photo-element");
    this.textElement = this.cardElement.querySelector(".elements__text");
    this.likeElement = this.cardElement.querySelector(".elements__like");
    this.trashElement = this.cardElement.querySelector(".elements__trash");
  }

  _setEventListeners() {
    this.photoElement.addEventListener("click", this._handleCardClick);
    this.likeElement.addEventListener("click", this._handleLikeElementClick); 
    this.trashElement.addEventListener("click", this._handleTrashElementClick);
  }

  _handleLikeElementClick(event) {
    event.target.classList.toggle("elements__like_active");
  }

  _handleTrashElementClick(event) {
    event.target.parentNode.remove();
  }

  _definePhotoElementAttributes() {
    this.photoElement.src = this.link;
    this.photoElement.alt = this.name;
  }

  _addTextToTextElement() {
    this.textElement.textContent = this.name;  
  }

  generateCard() {
    this.cardElement = this._getTemplate();
    this._findElements();
    this._setEventListeners();
    this._definePhotoElementAttributes();
    this._addTextToTextElement();
    return this.cardElement;
  }
}
