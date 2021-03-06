// const renameButton = document.querySelector("#rename"); // in pages.js

renameButton.addEventListener("click", rename);

function rename() {
    page = 1;

    localStorage.setItem(USERNAME_KEY, ""); // reset localStorage "userName"
    checkUserName(); // in pages.js

    const lastTheme = localStorage.getItem("theme");
    localStorage.setItem("theme", ""); // reset localStorage "theme"
    window.location.reload(); // 페이지 새로고침
}
setRenameTheme();