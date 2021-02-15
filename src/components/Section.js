import { token, groupId } from "../config";
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _fetchCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${groupId}/cards`, {
      headers: {
        authorization: token
      }
    })  
    .then(res => {
      return res.json();
    });
  }

  // Отрисовка элементов
  renderItems() {
    this._fetchCards()
      .then(initialItems => {
        initialItems.forEach(item => this._renderer(item));
      })
      .catch(error => {
        console.log(error);
      })
  }

  // Добавить элемент 
  addItem(element) {
    this._container.prepend(element);
  }
}
