const num = 6; // 테마 개수
const theme = document.querySelector("#theme");
const button = document.querySelector("#theme #button");
const themeList = document.querySelector("#themeList");

const bgImages = ["1-1.jpeg", "2-1.jpeg", "3-1.jpeg", "4-1.jpeg", "5-1.jpeg", "6-1.jpeg"];
const themeImages = ["1-2.png", "2-2.png", "3-2.png", "4-2.png", "5-2.png", "6-2.png"];
const checkedThemeImages = ["1-3.png", "2-3.png", "3-3.png", "4-3.png", "5-3.png", "6-3.png"];
const colors = ["#b3d6fd", "#feeeae", "#d2bcfa", "#fa9898", "#bad1fc", "#dfd2fe"];

const firstTheme = Math.floor(Math.random() * bgImages.length); // 처음 시작 시 random
setTheme(firstTheme);

function setTheme(index) {
    const chosenImage = bgImages[index];
    const chosenTheme = themeImages[index];
    const checkedTheme = checkedThemeImages[index];
    const chosenColor = colors[index];

    document.querySelector("body").style.backgroundImage = `url(img/${chosenImage})`;
    document.querySelector(".clock").style.background = chosenColor;

    // set button img
    const buttonImg = document.createElement("img");
    buttonImg.src = `img/${chosenTheme}`;
    button.appendChild(buttonImg);
    setButtonAction(buttonImg);

    setThemeList(index, checkedTheme);
}

function setThemeList(index, checkedTheme) {
    for (i = 0; i < num; i++) {
        const themes = document.createElement("img");
        themes.id = i;
        themes.src = `img/${themeImages[i]}`;
        themeList.appendChild(themes);
    }
    // checked img in themeList
    const checked = themeList.children.item(index);
    checked.src = `img/${checkedTheme}`;
    setThemeListAction();
}

function setButtonAction(buttonImg) {
    buttonImg.addEventListener("click", () => {
        themeList.classList.toggle("hidden");
    });
}

function setThemeListAction() {
    for (i = 0; i < num; i++) {
        const themeListImg = document.querySelector(`#themeList img:nth-child(${i + 1})`);
        themeListImg.addEventListener("click", changeTheme);
    }
}
function changeTheme() {
    remove();
    setTheme(this.id);
}
function remove() {
    const buttonImg = document.querySelector("#button img");
    button.removeChild(buttonImg);
    for (i = 0; i < num; i++) {
        const themeListImg = document.querySelector("#themeList img");
        themeList.removeChild(themeListImg);
    }
}