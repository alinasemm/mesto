let editButton = document.querySelector("#edit-button");
let popup = document.querySelector(".popup");
editButton.addEventListener("click", function () {
    popup.classList.add("popup_opened");
})

let closeIcon = document.querySelector("#close-icon");
function closePopup () {
    popup.classList.remove("popup_opened");
}

closeIcon.addEventListener("click", closePopup);

let formElement = document.querySelector("#container");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#job");
let nameProfile = document.querySelector("#profile-name");
let jobProfile = document.querySelector("#profile-job");

function formSubmitHandler (event) {
    event.preventDefault();
    
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 
