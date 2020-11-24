const popupPhotoElement = document.querySelector("#popup-photo-element");

function createElement(name, link) {
    const template = document.querySelector("#template").content;
    const newElement = template.cloneNode(true);

    const photoElement = newElement.querySelector(".elements__photo-element");
    photoElement.src = link;
    photoElement.alt = name;

    photoElement.addEventListener("click", function () {
        const popupPhoto = document.querySelector("#popup-photo");
        popupPhoto.src = photoElement.src;
        popupPhoto.alt = name;

        const popupPhotoName = document.querySelector("#popup-photo-name");
        popupPhotoName.textContent = name;

        openPopup(popupPhotoElement);
    });

    newElement.querySelector(".elements__text").textContent = name;
    newElement.querySelector(".elements__like").addEventListener("click", function (event) {
        event.target.classList.toggle("elements__like_active");
    }); 
    newElement.querySelector(".elements__trash").addEventListener("click", function (event) {
        event.target.parentNode.remove();
    }); 

    const container = document.querySelector(".elements"); 
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

    const nameField = popupProfile.querySelector("#name");
    const jobField = popupProfile.querySelector("#job");
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

    const editButton = document.querySelector("#edit-button");
    function handleEditButtonClick () {
        addInfoToFields();
        openPopup(popupProfile);
    }
    editButton.addEventListener("click", handleEditButtonClick);

    const form = popupProfile.querySelector("#container");
    function handleFormSubmit (event) {
        event.preventDefault();
        closePopup(popupProfile);
        addInfoToPage();
    }
    form.addEventListener("submit", handleFormSubmit); 

    const closeIcon = document.querySelector("#close-icon");
    function handleCloseIconClick () {
        closePopup(popupProfile);
    }
    closeIcon.addEventListener("click", handleCloseIconClick);
}

function initElementsPopup () {
    const popupElements = document.querySelector("#popup-elements");

    const addButton = document.querySelector("#add-button");
    function handleAddButtonClick () {
        openPopup(popupElements);
    }
    addButton.addEventListener("click", handleAddButtonClick);

    const formCards = popupElements.querySelector("#container-elements");
    function handleFormSubmitCards (event) {
        event.preventDefault();

        const placeField = document.querySelector("#place");
        const linkField = document.querySelector("#link");
        createElement(placeField.value, linkField.value);

        closePopup(popupElements);
    }
    formCards.addEventListener("submit", handleFormSubmitCards);

    const closeIconCards = document.querySelector("#close-icon-cards");
    function handleCloseIconCardsClick () {
        closePopup(popupElements);
    }
    closeIconCards.addEventListener("click", handleCloseIconCardsClick);
}

function initPhotoElementPopup () {
    const closeIconBigPhoto = document.querySelector("#close-icone-big-photo");
    function handlecloseIconBigPhotoClick () {
        closePopup(popupPhotoElement);
    }
    closeIconBigPhoto.addEventListener("click", handlecloseIconBigPhotoClick);
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
