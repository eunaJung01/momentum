const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const intro_clock = document.querySelector("#page1 .clock");
const main = document.querySelector("#page2");
// const quote = document.querySelector("#quote"); // in quotes.js
const container = document.querySelector("#container");
const renameButton = document.querySelector("#rename");

let page = 1;

// repeating strings
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName";

// check userName in localStorage
function checkUserName() {
    let savedUserName = localStorage.getItem(USERNAME_KEY);
    if (savedUserName === null || savedUserName === "") {
        page = 1;
        paint1stPage();
        loginForm.addEventListener("submit", onLoginSubmit);
    } else {
        page = 2;
        paint2ndPage(savedUserName);
    }
}
checkUserName();

// get userName
function onLoginSubmit(event) {
    // event.preventDefault(); // 엔터 후 새로고침 방지 (고유동작 중지)
    window.location.reload(); // 페이지 새로고침
    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName); // save in local storage
    paint2ndPage(userName);
    loginInput.value = null;
}

function paint1stPage() {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    intro_clock.classList.remove(HIDDEN_CLASSNAME);
    main.classList.add(HIDDEN_CLASSNAME);
    quote.classList.add(HIDDEN_CLASSNAME);
    container.classList.add(HIDDEN_CLASSNAME);
    renameButton.classList.add(HIDDEN_CLASSNAME);
}

function paint2ndPage(userName) {
    loginForm.classList.add(HIDDEN_CLASSNAME);
    intro_clock.classList.add(HIDDEN_CLASSNAME);
    paintGreetings(userName);
    main.classList.remove(HIDDEN_CLASSNAME);
    quote.classList.remove(HIDDEN_CLASSNAME);
    container.classList.remove(HIDDEN_CLASSNAME);
    renameButton.classList.remove(HIDDEN_CLASSNAME);
}

function paintGreetings(userName) {
    greeting.innerText = `Hello ${userName}`; // "Hello " + userName
    greeting.classList.remove(HIDDEN_CLASSNAME);
}