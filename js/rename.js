const renameButton = document.querySelector("#rename");

renameButton.addEventListener("click", rename);

function rename() {
    localStorage.setItem(USERNAME_KEY, "");
    checkUserName();
}