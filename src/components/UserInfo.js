export default class UserInfo {
  constructor({ 
    nameSelector, 
    jobSelector, 
    avatarSelector, 
    fetchUserInfo, 
    updateAvatar, 
    updateUserInfo
  }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._fetchUserInfo = fetchUserInfo;
    this._updateAvatar = updateAvatar;
    this._updateUserInfo = updateUserInfo;

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

  editAvatar(avatar) {
    return this._updateAvatar(avatar)
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

  saveUserInfo({ name, job }) {
    return this._updateUserInfo({ name, about: job })
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
