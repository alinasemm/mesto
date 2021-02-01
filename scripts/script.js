import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";

const container = document.querySelector(".elements");

const popupProfile = document.querySelector("#popup-profile");
const profileForm = popupProfile.querySelector("#popup-profile-container");
const nameField = profileForm.querySelector("#popup-profile-name");
const nameFieldError = profileForm.querySelector("#popup-profile-name-error");
const jobField = profileForm.querySelector("#popup-profile-job");
const jobFieldError = profileForm.querySelector("#popup-profile-job-error");
const profileName = document.querySelector("#profile-name");
const profileJob = document.querySelector("#profile-job");
const editProfileButton = document.querySelector("#edit-profile-button");
const submitProfileButton = document.querySelector("#popup__submit-button");

const popupElements = document.querySelector("#popup-elements");
const addElementButton = document.querySelector("#add-element-button");
const elementsForm = popupElements.querySelector("#popup-elements-container");
const placeField = elementsForm.querySelector("#popup-elements-place");
const placeFieldError = elementsForm.querySelector("#popup-elements-place-error");
const linkField = elementsForm.querySelector("#popup-elements-link");
const linkFieldError = elementsForm.querySelector("#popup-elements-link-error");
const submitElementsButton = document.querySelector("#popup__submit-button_elements");

const profilePopupClass = new Popup("#popup-profile");
profilePopupClass.setEventListeners();

const elementsPopupClass = new Popup("#popup-elements");
elementsPopupClass.setEventListeners();

const photoPopupClass = new PopupWithImage("#popup-preview");
photoPopupClass.setEventListeners();

const ValidationConfig = {
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__field_error"
}

const profileFormValidator = new FormValidator(ValidationConfig, profileForm);
profileFormValidator.enableValidation();

const elementsFormValidator = new FormValidator(ValidationConfig, elementsForm);
elementsFormValidator.enableValidation();


function addCard(list, newCard) {
    list.prepend(newCard);
}

function cleanInputs (inputs) {
    inputs.forEach(function (input) {
        input.value = "";
    });
}

function addProfileInfoToFields () {
    nameField.value = profileName.textContent
    jobField.value = profileJob.textContent
}

function addProfileInfoToPage () {
    profileName.textContent = nameField.value;
    profileJob.textContent = jobField.value;
}

editProfileButton.addEventListener("click", function () {
    addProfileInfoToFields();

    const inputs = [nameField, jobField];
    const errorSpans = [nameFieldError, jobFieldError];
    profileFormValidator.resetForm(inputs, errorSpans, submitProfileButton);
    
    profilePopupClass.open();
});

profileForm.addEventListener("submit", function (event) {
    event.preventDefault();
    profilePopupClass.close();
    addProfileInfoToPage();
}); 


addElementButton.addEventListener("click", function () {
    const inputs = [placeField, linkField];
    const errorSpans = [placeFieldError, linkFieldError];
    elementsFormValidator.resetForm(inputs, errorSpans, submitElementsButton);
    cleanInputs(inputs);

    elementsPopupClass.open();
});

elementsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const card = new Card(placeField.value, linkField.value, "#template", () => photoPopupClass.open(placeField.value, linkField.value));
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    elementsPopupClass.close();
    cleanInputs([placeField, linkField]);
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
        const card = new Card(elementData.name, elementData.link, "#template", () => photoPopupClass.open(elementData.name, elementData.link));
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    }
}, ".elements");

cardsList.renderItems();

