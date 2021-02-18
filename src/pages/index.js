import { token, groupId } from "../config";
import '../pages/index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js"
 

const editProfileButton = document.querySelector("#edit-profile-button");
const profileForm = document.querySelector("#popup-profile-container");
const submitProfileButton = document.querySelector("#popup__submit-button");

const addElementButton = document.querySelector("#add-element-button");
const elementsForm = document.querySelector("#popup-elements-container");
const submitElementsButton = document.querySelector("#popup__submit-button_elements");

function confirmCardDelete (onConfirm) {
  deleteCardPopup.open(() => {
    onConfirm();
    deleteCardPopup.close();
  });
}

function createCard(data) {
  const onCardClick = () => {
    photoPopup.open(data.name, data.link);
  }
  const card = new Card(data, userInfo.getUserId.bind(userInfo), confirmCardDelete, "#template", onCardClick);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-job",
  avatarSelector: ".profile__avatar-image",
  overlaySelector: ".profile__avatar-overlay"
}, () => {
  avatarPopup.open();
});

const deleteCardPopup = new PopupWithConfirm("#popup-delete-card");
deleteCardPopup.setEventListeners();

const profilePopup = new PopupWithForm("#popup-profile", (data) => userInfo.saveUserInfo(data));
profilePopup.setEventListeners();

const elementsPopup = new PopupWithForm("#popup-elements", (data) => {
  api.createCard(data)
    .then(createCard)
    .catch(error => {
      console.log(error);
    });
});
elementsPopup.setEventListeners();

const photoPopup = new PopupWithImage("#popup-preview");
photoPopup.setEventListeners();

//Конструктор (селектор попапа и то, что происходит именно с ним при отправке формы)
const avatarPopup = new PopupWithForm("#popup-refresh-avatar", ({ url }) => {
  userInfo.updateAvatar(url);
});
avatarPopup.setEventListeners();

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

