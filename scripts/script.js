const popupPhotoElement = document.querySelector("#popup-preview");
const popupPhoto = document.querySelector("#popup-preview-photo");
const popupPhotoName = document.querySelector("#popup-preview-name");

const template = document.querySelector("#template").content;
const container = document.querySelector(".elements");

const popupProfile = document.querySelector("#popup-profile");
const nameField = popupProfile.querySelector("#popup-profile-name");
const jobField = popupProfile.querySelector("#popup-profile-job");
const profileForm = popupProfile.querySelector("#popup-profile-container");
const profilePopupCloseIcon = popupProfile.querySelector("#popup-profile-close-icon");
const profileName = document.querySelector("#profile-name");
const profileJob = document.querySelector("#profile-job");
const editProfileButton = document.querySelector("#edit-profile-button");

const popupElements = document.querySelector("#popup-elements");
const addElementButton = document.querySelector("#add-element-button");
const elementsForm = popupElements.querySelector("#popup-elements-container");
const placeField = elementsForm.querySelector("#popup-elements-place");
const linkField = elementsForm.querySelector("#popup-elements-link");
const popupElementsCloseIcon = popupElements.querySelector("#popup-elements-close-icon");

const popupPreviewCloseIcon = popupPhotoElement.querySelector("#popup-preview-close-icone");

function createElement(name, link) {
    const newElement = template.cloneNode(true);

    const photoElement = newElement.querySelector(".elements__photo-element");
    photoElement.src = link;
    photoElement.alt = name;
    photoElement.addEventListener("click", function () {
        popupPhoto.src = photoElement.src;
        popupPhoto.alt = name;
        popupPhotoName.textContent = name;
        openPopup(popupPhotoElement);
    });

    const textElement = newElement.querySelector(".elements__text");
    textElement.textContent = name;

    const likeElement = newElement.querySelector(".elements__like");
    likeElement.addEventListener("click", function (event) {
        event.target.classList.toggle("elements__like_active");
    }); 

    const trashElement = newElement.querySelector(".elements__trash");
    trashElement.addEventListener("click", function (event) {
        event.target.parentNode.remove();
    }); 
 
    container.prepend(newElement);
}

function openPopup (popup) {
    popup.classList.add("popup_opened");
}

function closePopup (popup) {
    popup.classList.remove("popup_opened");
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
    openPopup(popupProfile);
});
profileForm.addEventListener("submit", function (event) {
    event.preventDefault();
    closePopup(popupProfile);
    addProfileInfoToPage();
}); 
profilePopupCloseIcon.addEventListener("click", function () {
    closePopup(popupProfile);
});


addElementButton.addEventListener("click", function () {
    openPopup(popupElements);
});
elementsForm.addEventListener("submit", function (event) {
    event.preventDefault();
    createElement(placeField.value, linkField.value);
    closePopup(popupElements);
});
popupElementsCloseIcon.addEventListener("click", function () {
    closePopup(popupElements);
});


popupPreviewCloseIcon.addEventListener("click", function () {
    closePopup(popupPhotoElement);
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

initialElements.forEach(function(elementData) {
    createElement(elementData.name, elementData.link);
});
