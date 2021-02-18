import api from "./Api"
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Отрисовка элементов
  renderItems() {
    api.getInitialCards()
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
