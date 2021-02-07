export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Отрисовка элементов
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  // Добавить элемент 
  addItem(element) {
    this._container.prepend(element);
  }
}
