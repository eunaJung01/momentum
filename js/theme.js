const num = 6; // 테마 개수
const theme = document.querySelector("#theme");
const button = document.querySelector("#theme #button");
const themeList = document.querySelector("#themeList");
const toDoInput = document.querySelector("#todo-form input");

const bgImages = ["1-1.jpeg", "2-1.jpeg", "3-1.jpeg", "4-1.jpeg", "5-1.jpeg", "6-1.jpeg"];
const themeImages = ["1-2.png", "2-2.png", "3-2.png", "4-2.png", "5-2.png", "6-2.png"];
const checkedThemeImages = ["1-3.png", "2-3.png", "3-3.png", "4-3.png", "5-3.png", "6-3.png"];

const bgColors = ["#f991a0", "#f49b85", "#cadbcd", "#b8c6f6", "#b196c1", "#5e3b59"];
const colors = ["#b3d6fd", "#feeeae", "#d2bcfa", "#fa9898", "#bad1fc", "#dfd2fe"];

var theme_index = null; // 초기값

/*
처음에 닉네임 입력 받을 때 random -> localStorage에 저장
새로 고침할 때(1. 사용자 임의로 새로 고침 / 2. Erase All을 눌렀을 때) localStorage에 있는 theme 번호를 가져와서 테마가 변경 되지 않도록 하기
테마 변경 시 localStorage 값 변경
rename 버튼을 눌렀을 때 다시 random으로 테마 변경
*/

let savedTheme = localStorage.getItem("theme");
if (savedTheme == null || savedTheme == "") {
    theme_index = setRandomTheme();
} else {
    theme_index = savedTheme;
}
setTheme(theme_index);

function setRandomTheme() {
    do {
        const randomTheme = Math.floor(Math.random() * bgImages.length);
        localStorage.setItem("theme", randomTheme); // save in local storage
        return randomTheme;
    } while (randomTheme != lastTheme);
}

function setTheme(index) {
    theme_index = index;
    const chosenImage = bgImages[index];
    const chosenTheme = themeImages[index];
    const checkedTheme = checkedThemeImages[index];
    const chosenColor = colors[index];
    const chosenBgColor = bgColors[index];

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
    theme_index = this.id;
    localStorage.setItem("theme", theme_index);

    setTheme(theme_index);
    setAnalogClockTheme(theme_index);
    setQuotesTheme();
    setClockTheme();
    setCalendarTheme_today();
    setCalendarTheme_active();
    setToDoTheme();
    setDoneTheme();
    setRenameTheme();
}
function remove() {
    const buttonImg = document.querySelector("#button img");
    button.removeChild(buttonImg);
    for (i = 0; i < num; i++) {
        const themeListImg = document.querySelector("#themeList img");
        themeList.removeChild(themeListImg);
    }
}

// setting themes on the elements
function setQuotesTheme() {
    const quote = document.querySelector("#quote");
    quote.style.background = colors[theme_index];
    quote.style.border = `1px solid ${colors[theme_index]}`;
}
function setClockTheme() {
    if (theme_index == 5) {
        document.querySelector("#time .clock").style.color = "white";
    } else {
        document.querySelector("#time .clock").style.color = "black";
    }
}
function setAnalogClockTheme() {
    document.querySelector(".inner-clock-face").style.background = colors[theme_index];
    if (theme_index == 1) {
        document.querySelector(".second-hand").style.background = "#fbb112";
    } else if (theme_index == 5) {
        document.querySelector(".second-hand").style.background = "#a076e4";
    } else {
        document.querySelector(".second-hand").style.background = "white";
    }
}
function setCalendarTheme_today() {
    const today = document.querySelector(".calendar-table td.today");
    if (today) {
        document.querySelector(".calendar-table td.today").style.background = colors[theme_index];
    }
}
function setCalendarTheme_active() {
    const day_active = document.querySelector(".calendar-table td.day-active");
    if (day_active) {
        day_active.style.background = bgColors[theme_index];
    }
}
function setToDoTheme() {
    const doneButton = document.querySelectorAll("#todo-list #doneButton");
    const deleteButton = document.querySelectorAll("#todo-list #deleteButton");
    doneButton.forEach((button) => button.style.color = colors[theme_index]);
    deleteButton.forEach((button) => button.style.color = bgColors[theme_index]);
}
// setToDoInputTheme
toDoInput.addEventListener("focus", () => {
    toDoInput.style.outline = "solid";
    toDoInput.style.outlineColor = colors[theme_index];
    toDoInput.style.outlineWidth = "3.8px";
});
toDoInput.addEventListener("focusout", () => {
    toDoInput.style.outline = "none";
});
function setDoneTheme() {
    const deleteButton = document.querySelectorAll("#done-list #deleteButton");
    deleteButton.forEach((button) => button.style.color = bgColors[theme_index]);
}
// setEraseAllTheme
const eraseAll = document.querySelectorAll("#erase");
eraseAll.forEach((erase) => {
    erase.addEventListener("mouseover", () => {
        erase.style.backgroundColor = colors[theme_index];
        erase.style.color = "white";
    });
    erase.addEventListener("mouseout", () => {
        erase.style.backgroundColor = "white";
        erase.style.color = "black";
    });
});
function setRenameTheme() {
    const renameButton = document.querySelector("#rename");
    renameButton.style.textShadow = `${colors[theme_index]} 2px 0 4px`;
}