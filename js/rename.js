// const renameButton = document.querySelector("#rename"); // in pages.js

renameButton.addEventListener("click", rename);

function rename() {
    localStorage.setItem(USERNAME_KEY, "");
    checkUserName();

    const lastTheme = localStorage.getItem("theme");
    localStorage.setItem("theme", "");
    window.location.reload(); // 페이지 새로고침
}
setRenameTheme();