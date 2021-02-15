import { token, groupId } from "../config";
export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    this._fetchUserInfo()
      .then((data) => {
        this.setUserInfo({
          name: data.name,
          job: data.about,
          avatar: data.avatar
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  _fetchUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${groupId}/users/me`, {
      headers: {
        authorization: token
      }
    })  
    .then(res => {
      return res.json();
    });
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src
    }
  }
  
  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }
}
