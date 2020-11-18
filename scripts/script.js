let editButton = document.querySelector("#edit-button");
let addButton = document.querySelector("#add-button");
let popupProfile = document.querySelector("#popup-profile");
let popupElements = document.querySelector("#popup-elements");
let nameField = document.querySelector("#name");
let jobField = document.querySelector("#job");
let placeField = document.querySelector("#place");
let linkField = document.querySelector("#link");
let profileName = document.querySelector("#profile-name");
let profileJob = document.querySelector("#profile-job");

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

let form = document.querySelector("#container");
let formCards = document.querySelector("#container-elements");

function closePopup (popup) {
    popup.classList.remove("popup_opened");
}
function addInfoToPage () {
    profileName.textContent = nameField.value;
    profileJob.textContent = jobField.value;
}
function handleFormSubmit (event) {
    event.preventDefault();
    closePopup(popupProfile);
    addInfoToPage();
}

// function handleFormSubmitCards (event) {
//     event.preventDefault();
//     closePopup(popupElements);
// }

form.addEventListener("submit", handleFormSubmit); 
// formCards.addEventListener("submit", handleFormSubmitCards);


let closeIcon = document.querySelector("#close-icon");
let closeIconCards = document.querySelector("#close-icon-cards");

function handleCloseIconClick (popup) {
    closePopup(popupProfile);
}

function handleCloseIconCardsClick (popup) {
    closePopup(popupElements);
}

closeIcon.addEventListener("click", handleCloseIconClick);
closeIconCards.addEventListener("click", handleCloseIconCardsClick);


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
    newElement.querySelector('.elements__like').addEventListener('click', function (event) {
        event.target.classList.toggle('elements__like_active');
    }); 
    
    container.appendChild(newElement);
}

initialElements.forEach(function(elementData) {
    createElement(elementData.name, elementData.link);
});

// ...

// function openPopup (popup) {
//     popup.classList.add("popup_opened");
// }


// function sum (a, b) {
//     return a + b;
// }

// function sum (a, b) {
//     return a + b;
// }

// let result0 = sum(3, 4);
// let result1 = sum(8, 9);
// let result2 = sum(2, 4);
// console.log(result0, result1, result2);
