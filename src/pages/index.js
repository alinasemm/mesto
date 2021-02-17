import { token, groupId } from "../config";
import '../pages/index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
 

const editProfileButton = document.querySelector("#edit-profile-button");
const profileForm = document.querySelector("#popup-profile-container");
const submitProfileButton = document.querySelector("#popup__submit-button");

const addElementButton = document.querySelector("#add-element-button");
const elementsForm = document.querySelector("#popup-elements-container");
const submitElementsButton = document.querySelector("#popup__submit-button_elements");

function createCard(data) {
  const card = new Card(data, userInfo.getUserId.bind(userInfo), "#template", () => {
    photoPopup.open(data.name, data.link);
  });
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-job",
  avatarSelector: ".profile__avatar"
});

const profilePopup = new PopupWithForm("#popup-profile", (data) => userInfo.saveUserInfo(data));
profilePopup.setEventListeners();

const elementsPopup = new PopupWithForm("#popup-elements", ({ name, link }) => {
  fetch(`https://mesto.nomoreparties.co/v1/${groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })  
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(createCard)
    .catch(error => {
      console.log(error);
    });
});
elementsPopup.setEventListeners();

const photoPopup = new PopupWithImage("#popup-preview");
photoPopup.setEventListeners();

const validationConfig = {
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__field_error"
}

const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const elementsFormValidator = new FormValidator(validationConfig, elementsForm);
elementsFormValidator.enableValidation();

editProfileButton.addEventListener("click", function () {
  const { name, job } = userInfo.getUserInfo();
  profilePopup.setInputValues({ name, job });
  profileFormValidator.resetForm();
  profilePopup.open();
});

addElementButton.addEventListener("click", function () {
  elementsFormValidator.resetForm();
  elementsPopup.clearInputs();
  elementsPopup.open();
});

const cardsList = new Section ({
  renderer: createCard
}, ".elements");

cardsList.renderItems();

