import api from "./Api";
export default class Card {
  constructor({ name, link, likes = [], _id, owner }, getCurrentUserId, confirmDelete, templateSelector, handleCardClick) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardId = _id;
    this._getCurrentUserId = getCurrentUserId;
    this._confirmDelete = confirmDelete;
    this._ownerId = owner._id;
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

  _isCardLikedByCurrentUser() {
    return this.likes.find((userWhoLikedCard) => {
      return userWhoLikedCard._id === this._getCurrentUserId();
    });
  }

  _like() {
    return api.likeCard(this._cardId)
    .then((data) => {
      this.likes = data.likes;
      this._showLikes();
      this.likeElement.classList.add("elements__like_active");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  _fillLikeElement() {
    if(this._isCardLikedByCurrentUser()) {
      this.likeElement.classList.add("elements__like_active");
    }
  }

  _dislike() {
    return api.dislikeCard(this._cardId)
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

    if (this._isCardLikedByCurrentUser()) {
      this._dislike();
    } else {
      this._like();
    }
  }

  _handleTrashElementClick(event) {
    this._confirmDelete(() => {
      api.deleteCard(this._cardId)
      .then(() => {
        event.target.parentNode.remove();
      })
      .catch((error) => {
        console.log(error);
      });
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

  _selectTrashVisibility() {
    const isMyCard = this._ownerId === this._getCurrentUserId();
    if(isMyCard) {
      this.trashElement.classList.add("elements__trash_visible");
    }
  }

  generateCard() {
    this.cardElement = this._getTemplate();
    this._findElements();
    this._setEventListeners();
    this._definePhotoElementAttributes();
    this._addTextToTextElement();
    this._showLikes();
    this._selectTrashVisibility();
    this._fillLikeElement();
    return this.cardElement;
  }
}
