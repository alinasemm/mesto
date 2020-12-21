/*
1 - определили задачу
2 - нашли варианты решения задачи
3 - выбрали вариант решения
4 - сделали выбранный вариант
5 - протестировали
6 - если работает - закончили, если нет - назад к 1му пункту
*/
export default class Card {
  constructor(name, link, templateSelector, onPhotoElementClick) {
      this.name = name;
      this.link = link;
      this.templateSelector = templateSelector;
      this.onPhotoElementClick = onPhotoElementClick;
  }

  _getTemplate() {
      const template = document.querySelector(this.templateSelector).content;
      return template.cloneNode(true);
  }

  _handlePhotoElementClick() {
      this.onPhotoElementClick(this.name, this.link);
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
