const popupPhotoElement = document.querySelector("#popup-preview");
const popupPhoto = document.querySelector("#popup-preview-photo");
const popupPhotoName = document.querySelector("#popup-preview-name");

const template = document.querySelector("#template").content;
const container = document.querySelector(".elements");

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

function initProfilePopup () {
    const popupProfile = document.querySelector("#popup-profile");

    const nameField = popupProfile.querySelector("#popup-profile-name");
    const jobField = popupProfile.querySelector("#popup-profile-job");
    const profileName = document.querySelector("#profile-name");
    const profileJob = document.querySelector("#profile-job");
    function addInfoToFields () {
        nameField.value = profileName.textContent
        jobField.value = profileJob.textContent
    }
    function addInfoToPage () {
        profileName.textContent = nameField.value;
        profileJob.textContent = jobField.value;
    }

    const editButton = document.querySelector("#edit-profile-button");
    editButton.addEventListener("click", function () {
        addInfoToFields();
        openPopup(popupProfile);
    });

    const form = popupProfile.querySelector("#popup-profile-container");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        closePopup(popupProfile);
        addInfoToPage();
    }); 

    const closeIcon = document.querySelector("#popup-profile-close-icon");
    closeIcon.addEventListener("click", function () {
        closePopup(popupProfile);
    });
}

function initElementsPopup () {
    const popupElements = document.querySelector("#popup-elements");

    const addButton = document.querySelector("#add-element-button");
    addButton.addEventListener("click", function () {
        openPopup(popupElements);
    });

    const form = popupElements.querySelector("#popup-elements-container");
    const placeField = form.querySelector("#popup-elements-place");
    const linkField = form.querySelector("#popup-elements-link");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        createElement(placeField.value, linkField.value);
        closePopup(popupElements);
    });

    const closeIcon = popupElements.querySelector("#popup-elements-close-icon");
    closeIcon.addEventListener("click", function () {
        closePopup(popupElements);
    });
}

function initPhotoElementPopup () {
    const closeIcon = popupPhotoElement.querySelector("#popup-preview-close-icone");
    closeIcon.addEventListener("click", function () {
        closePopup(popupPhotoElement);
    });
}

function addInitialElements () {
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
}

initProfilePopup();
initElementsPopup();
initPhotoElementPopup();
addInitialElements();
