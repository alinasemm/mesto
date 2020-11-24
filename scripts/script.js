const editButton = document.querySelector("#edit-button");
const addButton = document.querySelector("#add-button");
const popupProfile = document.querySelector("#popup-profile");
const popupElements = document.querySelector("#popup-elements");
const nameField = document.querySelector("#name");
const jobField = document.querySelector("#job");
const placeField = document.querySelector("#place");
const linkField = document.querySelector("#link");
const profileName = document.querySelector("#profile-name");
const profileJob = document.querySelector("#profile-job");
const popupPhotoElement = document.querySelector("#popup-photo-element");
const popupPhoto = document.querySelector("#popup-photo");
const popupPhotoName = document.querySelector("#popup-photo-name");

function openPopup (popup) {
    popup.classList.add("popup_opened");
}

function addInfoToFields () {
    nameField.value = profileName.textContent
    jobField.value = profileJob.textContent
}

function handleEditButtonClick () {
    openPopup(popupProfile);
    addInfoToFields();
}

function handleAddButtonClick () {
    openPopup(popupElements);
}

editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);

const form = document.querySelector("#container");
const formCards = document.querySelector("#container-elements");

function closePopup (popup) {
    popup.classList.remove("popup_opened");
}
function addInfoToPage () {
    profileName.textContent = nameField.value;
    profileJob.textContent = jobField.value;
}
function handleFormSubmit (event) {
    event.preventDefault();
    closePopup(popupProfile, );
    addInfoToPage();
}

function handleFormSubmitCards (event) {
    event.preventDefault();
    createElement(placeField.value, linkField.value);
    closePopup(popupElements);
}

form.addEventListener("submit", handleFormSubmit); 
formCards.addEventListener("submit", handleFormSubmitCards);


const closeIcon = document.querySelector("#close-icon");
const closeIconCards = document.querySelector("#close-icon-cards");
const closeIconBigPhoto = document.querySelector("#close-icone-big-photo");

function handleCloseIconClick () {
    closePopup(popupProfile);
}

function handleCloseIconCardsClick () {
    closePopup(popupElements);
}

function handlecloseIconBigPhotoClick () {
    closePopup(popupPhotoElement);
}

closeIcon.addEventListener("click", handleCloseIconClick);
closeIconCards.addEventListener("click", handleCloseIconCardsClick);
closeIconBigPhoto.addEventListener("click", handlecloseIconBigPhotoClick);


const container = document.querySelector('.elements'); 
const template = document.querySelector('#template').content;

const initialElements = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createElement(name, link) {
    const newElement = template.cloneNode(true);

    const photoElement = newElement.querySelector('.elements__photo-element');
    photoElement.src = link;
    photoElement.alt = name;

    photoElement.addEventListener('click', function () {
        popupPhoto.src = photoElement.src;
        popupPhoto.alt = name;
        popupPhotoName.textContent = name;
        openPopup(popupPhotoElement);
    });

    newElement.querySelector('.elements__text').textContent = name;
    newElement.querySelector('.elements__like').addEventListener('click', function (event) {
        event.target.classList.toggle('elements__like_active');
    }); 
    newElement.querySelector('.elements__trash').addEventListener('click', function (event) {
        event.target.parentNode.remove();
    }); 

    container.prepend(newElement);
}

initialElements.forEach(function(elementData) {
    createElement(elementData.name, elementData.link);
});
