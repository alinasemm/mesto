import { token, groupId } from "../config";
export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector, overlaySelector }, onOverlayClick) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._overlayElement = document.querySelector(overlaySelector);
    this._overlayElement.addEventListener("click", onOverlayClick);

    this._fetchUserInfo()
      .then((data) => {
        this._setUserInfo({
          name: data.name,
          job: data.about,
          avatar: data.avatar,
          _id: data._id
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  _setUserInfo({ name, job, avatar, _id }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    if (avatar) {
      this._avatarElement.src = avatar;
    }
    this._id = _id;
  }

  _fetchUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${groupId}/users/me`, {
      headers: {
        authorization: token
      }
    })  
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  saveUserInfo({ name, job }) {
    return fetch(`https://mesto.nomoreparties.co/v1/${groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })  
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      this._setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
        _id: data._id
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getUserId () {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src
    }
  }
}
