import { token, groupId } from "../config";
export default class Card {
  constructor({ name, link, likes = [], _id }, getCurrentUserId, confirmDelete, templateSelector, handleCardClick) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardId = _id;
    this._getCurrentUserId = getCurrentUserId;
    this._confirmDelete = confirmDelete;
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
    this.likeTextElement = this.cardElement.querySelector(".elements__like-text");
  }

  _setEventListeners() {
    this.photoElement.addEventListener("click", this._handleCardClick);
    this.likeElement.addEventListener("click", this._handleLikeElementClick.bind(this)); 
    this.trashElement.addEventListener("click", this._handleTrashElementClick.bind(this));
  }

  _like() {
    return fetch(`https://mesto.nomoreparties.co/v1/${groupId}/cards/likes/${this._cardId}`, {
      method: 'PUT',
      headers: {
        authorization: token
      }
    })  
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      this.likes = data.likes;
      this._showLikes();
      this.likeElement.classList.add("elements__like_active");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  _dislike() {
    return fetch(`https://mesto.nomoreparties.co/v1/${groupId}/cards/likes/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: token
      }
    })  
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      this.likes = data.likes;
      this._showLikes();
      this.likeElement.classList.remove("elements__like_active");
    })
    .catch((error) => {
      console.log(error);
    })
  }

  _handleLikeElementClick() {
    const isCardLiked = this.likes.find((likeUser) => {
      return likeUser._id === this._getCurrentUserId();
    })

    if (isCardLiked) {
      this._dislike();
    } else {
      this._like();
    }
  }

  _handleTrashElementClick(event) {
    this._confirmDelete(() => {
      event.target.parentNode.remove();
    });
  }

  _definePhotoElementAttributes() {
    this.photoElement.src = this.link;
    this.photoElement.alt = this.name;
  }

  _addTextToTextElement() {
    this.textElement.textContent = this.name;  
  }

  _showLikes() {
    this.likeTextElement.textContent = this.likes.length;
  }

  generateCard() {
    this.cardElement = this._getTemplate();
    this._findElements();
    this._setEventListeners();
    this._definePhotoElementAttributes();
    this._addTextToTextElement();
    this._showLikes();
    return this.cardElement;
  }
}
