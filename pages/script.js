let editButton = document.querySelector("#edit-button");
let popup = document.querySelector(".popup")
editButton.addEventListener("click", function(){
    popup.classList.add("popup_opened")
})

let closeIcon = document.querySelector("#close-icon");
closeIcon.addEventListener("click", function(){
    popup.classList.remove("popup_opened")
})

let formElement = document.querySelector("#container");
function formSubmitHandler (event) {
    event.preventDefault();
    let nameInput = document.querySelector("#name");
    let jobInput = document.querySelector("#job");

    let name = nameInput.value;
    let job = jobInput.value;

    let nameProfile = document.querySelector("#profile-name");
    let jobProfile = document.querySelector("#profile-job");

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    
}

formElement.addEventListener('submit', formSubmitHandler); 



