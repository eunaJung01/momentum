const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const intro_clock = document.querySelector("#intro .clock");
const main = document.querySelector("#main");
// const quote = document.querySelector("#quote"); // in js/quotes.js
const container = document.querySelector("#container");

// repeating strings
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName";

// check userName in localStorage
const savedUserName = localStorage.getItem(USERNAME_KEY);
if (savedUserName === null || savedUserName === "") {
    paint1stPage();
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paint2ndPage(savedUserName);
}

// get userName
function onLoginSubmit(event) {
    event.preventDefault(); // 엔터 후 새로고침 방지 (고유동작 중지)
    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName); // save in local storage
    paint2ndPage(userName);
}

function paint1stPage() {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    intro_clock.classList.remove(HIDDEN_CLASSNAME);
    main.classList.add(HIDDEN_CLASSNAME);
    quote.classList.add(HIDDEN_CLASSNAME);
    container.classList.add(HIDDEN_CLASSNAME);
}

function paint2ndPage(userName) {
    loginForm.classList.add(HIDDEN_CLASSNAME);
    intro_clock.classList.add(HIDDEN_CLASSNAME);
    paintGreetings(userName);
    main.classList.remove(HIDDEN_CLASSNAME);
    quote.classList.remove(HIDDEN_CLASSNAME);
    container.classList.remove(HIDDEN_CLASSNAME);
}

function paintGreetings(userName) {
    greeting.innerText = `Hello ${userName}`; // "Hello " + userName
    greeting.classList.remove(HIDDEN_CLASSNAME);
}