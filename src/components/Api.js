import { token, groupId } from "../config";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _post(path, body) {
    return fetch(`${this._baseUrl}${path}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(body)
    })
    .then(this._parseResponse)
  }

  _get(path) {
    return fetch(`${this._baseUrl}${path}`, {
      method: "GET",
      headers: this._headers
    })
    .then(this._parseResponse)
  }

  _patch(path, body) {
    return fetch(`${this._baseUrl}${path}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body)
    })
    .then(this._parseResponse)
  }

  _put(path) {
    return fetch(`${this._baseUrl}${path}`, {
      method: "PUT",
      headers: this._headers
    })
    .then(this._parseResponse)
  }

  _delete(path) {
    return fetch(`${this._baseUrl}${path}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._parseResponse)
  }

  getInitialCards() {
    return this._get("/cards");
  }

  getUserInfo() {
    return this._get("/users/me");
  }

  updateAvatar(avatar) {
    return this._patch("/users/me/avatar", { avatar });
  }

  saveUserInfo(data) {
    return this._patch("/users/me", data);
  }

  likeCard(cardId) {
    return this._put(`/cards/likes/${cardId}`);
  }

  dislikeCard(cardId) {
    return this._delete(`/cards/likes/${cardId}`)
  }

  deleteCard(cardId) {
    return this._delete(`/cards/${cardId}`)
  }

  createCard(data) {
    return this._post("/cards", data)
  }
}

export default new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json"
  }
}); 