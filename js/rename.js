// const renameButton = document.querySelector("#rename"); // in pages.js

renameButton.addEventListener("click", rename);

function rename() {
    localStorage.setItem(USERNAME_KEY, "");
    checkUserName();
}
setRenameTheme();