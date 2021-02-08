import '../pages/index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const editProfileButton = document.querySelector("#edit-profile-button");
const profileForm = document.querySelector("#popup-profile-container");
const nameField = profileForm.querySelector("#popup-profile-name");
const nameFieldError = profileForm.querySelector("#popup-profile-name-error");
const jobField = profileForm.querySelector("#popup-profile-job");
const jobFieldError = profileForm.querySelector("#popup-profile-job-error");
const submitProfileButton = document.querySelector("#popup__submit-button");

const addElementButton = document.querySelector("#add-element-button");
const elementsForm = document.querySelector("#popup-elements-container");
const placeField = elementsForm.querySelector("#popup-elements-place");
const placeFieldError = elementsForm.querySelector("#popup-elements-place-error");
const linkField = elementsForm.querySelector("#popup-elements-link");
const linkFieldError = elementsForm.querySelector("#popup-elements-link-error");
const submitElementsButton = document.querySelector("#popup__submit-button_elements");

const userInfo = new UserInfo({ nameSelector: "#profile-name", jobSelector: "#profile-job" });

const profilePopupClass = new PopupWithForm("#popup-profile", ({ name, job }) => {
  userInfo.setUserInfo({ name, job });
});
profilePopupClass.setEventListeners();

const elementsPopupClass = new PopupWithForm("#popup-elements", ({ place, link }) => {
    const card = new Card(place, link, "#template", () => {
      photoPopupClass.open(place, link);
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
});
elementsPopupClass.setEventListeners();

const photoPopupClass = new PopupWithImage("#popup-preview");
photoPopupClass.setEventListeners();

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
  profilePopupClass.setInputValues({ name, job });

  const inputs = [nameField, jobField];
  const errorSpans = [nameFieldError, jobFieldError];
  profileFormValidator.resetForm(inputs, errorSpans, submitProfileButton);
  
  profilePopupClass.open();
});

addElementButton.addEventListener("click", function () {
  const inputs = [placeField, linkField];
  const errorSpans = [placeFieldError, linkFieldError];
  elementsFormValidator.resetForm(inputs, errorSpans, submitElementsButton);
  elementsPopupClass.clearInputs();

  elementsPopupClass.open();
});


const initialElements = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
];

const cardsList = new Section ({
  items: initialElements,
  renderer: (elementData) => {
    const card = new Card(elementData.name, elementData.link, "#template", () => {
      photoPopupClass.open(elementData.name, elementData.link);
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, ".elements");

cardsList.renderItems();

