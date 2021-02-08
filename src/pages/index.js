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

function createCard(name, link) {
  const card = new Card(name, link, "#template", () => {
    photoPopupClass.open(name, link);
  });
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

const userInfo = new UserInfo({ nameSelector: "#profile-name", jobSelector: "#profile-job" });

const profilePopupClass = new PopupWithForm("#popup-profile", ({ name, job }) => {
  userInfo.setUserInfo({ name, job });
});
profilePopupClass.setEventListeners();

const elementsPopupClass = new PopupWithForm("#popup-elements", ({ place, link }) => {
  createCard(place, link);
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
  profileFormValidator.resetForm();
  profilePopupClass.open();
});

addElementButton.addEventListener("click", function () {
  elementsFormValidator.resetForm();
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
    createCard(elementData.name, elementData.link);
  }
}, ".elements");

cardsList.renderItems();

