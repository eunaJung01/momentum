const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

// repeating strings
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName";

// check userName in localStorage
const savedUserName = localStorage.getItem(USERNAME_KEY);
if (savedUserName === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUserName);
}

onLoginSubmit(); // 임시
// get userName
function onLoginSubmit(event) {
    // event.preventDefault(); // 엔터 후 새로고침 방지 (고유동작 중지)
    loginForm.classList.add(HIDDEN_CLASSNAME);
    // const userName = loginInput.value;
    const userName = "euna"; // 임시
    localStorage.setItem(USERNAME_KEY, userName); // save in local storage
    paintGreetings(userName);
}

function paintGreetings(userName) {
    greeting.innerText = `Hello ${userName}`; // "Hello " + userName
    greeting.classList.remove(HIDDEN_CLASSNAME);
}
