export default class Section {
  constructor({ renderer, containerSelector, getItems }) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._getItems = getItems;
  }

  // Отрисовка элементов
  renderItems() {
    return this._getItems()
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
