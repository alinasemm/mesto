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
