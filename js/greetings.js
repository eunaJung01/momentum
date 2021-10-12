const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const intro_clock = document.querySelector("#intro .clock");
const main = document.querySelector("#main");
// const quote = document.querySelector("#quote");
const container = document.querySelector("#container");

// repeating strings
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName";

// check userName in localStorage
const savedUserName = localStorage.getItem(USERNAME_KEY);
if (savedUserName === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paint2ndPage();
    paintGreetings(savedUserName);
}

// get userName
function onLoginSubmit(event) {
    event.preventDefault(); // 엔터 후 새로고침 방지 (고유동작 중지)
    paint2ndPage();
    const userName = loginInput.value;
    console.log(userName);
    localStorage.setItem(USERNAME_KEY, userName); // save in local storage
    paintGreetings(userName);
}

function paintGreetings(userName) {
    greeting.innerText = `Hello ${userName}`; // "Hello " + userName
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

function paint2ndPage() {
    loginForm.classList.add(HIDDEN_CLASSNAME);
    intro_clock.classList.add(HIDDEN_CLASSNAME);
    main.classList.remove(HIDDEN_CLASSNAME);
    quote.classList.remove(HIDDEN_CLASSNAME);
    container.classList.remove(HIDDEN_CLASSNAME);
}
