function test () {
    const nameField = profileForm.querySelector("#popup-profile-name");
    const jobField = profileForm.querySelector("#popup-profile-job");
    const submitProfileButton = document.querySelector("#popup__submit-button");

    function logArguments (firstArgument, secondArgument, thirdArgument) {
        console.log({ firstArgument, secondArgument, thirdArgument })
    }

    logArguments([nameField, jobField], submitProfileButton);
    logArguments([nameField, jobField], 'абсолютно любую штуку могу передать', 'любуууую!');
}

test();