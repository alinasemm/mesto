let editButton = document.querySelector("#edit-button");
let popup = document.querySelector(".popup");
let nameField = document.querySelector("#name");
let jobField = document.querySelector("#job");
let profileName = document.querySelector("#profile-name");
let profileJob = document.querySelector("#profile-job");

function openPopup () {
    popup.classList.add("popup_opened");
}
function addInfoToFields () {
    nameField.value = profileName.textContent
    jobField.value = profileJob.textContent
}
function handleEditButtonClick () {
    openPopup();
    addInfoToFields();
}
editButton.addEventListener("click", handleEditButtonClick);


let form = document.querySelector("#container");
function closePopup () {
    popup.classList.remove("popup_opened");
}
function addInfoToPage () {
    profileName.textContent = nameField.value;
    profileJob.textContent = jobField.value;
}
function handleFormSubmit (event) {
    event.preventDefault();
    closePopup();
    addInfoToPage();
}
form.addEventListener("submit", handleFormSubmit); 


let closeIcon = document.querySelector("#close-icon");
function handleCloseIconClick () {
    closePopup();
}
closeIcon.addEventListener("click", handleCloseIconClick);


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

    newElement.querySelector('.elements__photo-element').src = link;
    newElement.querySelector('.elements__text').textContent = name;
    
    container.appendChild(newElement);
}

initialElements.forEach(function(elementData) {
    createElement(elementData.name, elementData.link);
});