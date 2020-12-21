/*
1 - определили задачу
2 - нашли варианты решения задачи
3 - выбрали вариант решения
4 - сделали выбранный вариант
5 - протестировали
6 - если работает - закончили, если нет - назад к 1му пункту
*/

const popupPhotoName = document.querySelector("#popup-preview-name");
export default class Card {
  constructor(name, link, templateSelector, popupPhoto, openPopup, popupPhotoElement) {
      this.name = name;
      this.link = link;
      this.templateSelector = templateSelector;
      this.popupPhoto = popupPhoto;
      this.openPopup = openPopup;
      this.popupPhotoElement = popupPhotoElement;
  }

  _getTemplate() {
      const template = document.querySelector(this.templateSelector).content;
      return template.cloneNode(true);
  }

  _handlePhotoElementClick() {
      this.popupPhoto.src = this.photoElement.src;
      this.popupPhoto.alt = this.name;
      popupPhotoName.textContent = this.name;
      this.openPopup(this.popupPhotoElement); 
  } 

  _handleLikeElementClick(event) {
      event.target.classList.toggle("elements__like_active");
  }

  _handleTrashElementClick(event) {
      event.target.parentNode.remove();
  }

  _preparePhotoElement() {
      this.photoElement = this.cardElement.querySelector(".elements__photo-element");
      this.photoElement.src = this.link;
      this.photoElement.alt = this.name;
      this.photoElement.addEventListener("click", this._handlePhotoElementClick.bind(this));
  }

  _prepareTextElement() {
      const textElement = this.cardElement.querySelector(".elements__text");
      textElement.textContent = this.name;  
  }

  _prepareLikeElement() {
      const likeElement = this.cardElement.querySelector(".elements__like");
      likeElement.addEventListener("click", this._handleLikeElementClick); 
  }

  _prepareTrashElement() {
      const trashElement = this.cardElement.querySelector(".elements__trash");
      trashElement.addEventListener("click", this._handleTrashElementClick);
  }

  generateCard() {
      this.cardElement = this._getTemplate();
      this._preparePhotoElement();
      this._prepareTextElement();
      this._prepareLikeElement();
      this._prepareTrashElement();
      return this.cardElement;
  }
}
