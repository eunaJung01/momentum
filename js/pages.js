const page1 = document.querySelector("#page1");
const page1_clock = document.querySelector("#page1 .clock");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

const page2 = document.querySelector("#page2");
const greeting = document.querySelector("#greeting");
// const quote = document.querySelector("#quote"); // in quotes.js
const container = document.querySelector("#container");
const renameButton = document.querySelector("#rename");

// repeating strings
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName";

let page = 1; // 현재 어느 page에 있는지 감지 (for theme changing condition)

// check userName in localStorage
function checkUserName() {
    loginInput.value = null; // clear login-form input

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
    event.preventDefault(); // 페이지 변경이 없는 경우 : 엔터 후 새로고침 방지 (고유 동작 중지)

    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName); // save in local storage
    paintGreetings(userName);
    loginInput.readOnly = true;
    
    movePage(); // movements at 1st page -> 2nd page
    page = 2;
}

function movePage() {
    const page1Rect = page1.getBoundingClientRect();
    const page2Rect = page2.getBoundingClientRect();
    let pos1 = page1Rect.top + 110;
    let pos2 = page2Rect.top;
    
    let id = setInterval(frame, 1);
    function frame() {
        if (pos2 == 6) {
            clearInterval(id);
        } else {
            page1.style.top = pos1 + 'px';
            page2.style.top = pos2 + 'px';
            pos1--;
            pos2--;
        }
    }
}

function paint1stPage() {
    page1.style.top = "50%";
    page2.style.top = "100%";
}

function paint2ndPage(userName) {
    paintGreetings(userName);
    page1.classList.add(HIDDEN_CLASSNAME);
    page2.style.top = "6px";
}

// paint userName in 2nd page
function paintGreetings(userName) {
    greeting.innerText = `Hello ${userName}`; // "Hello " + userName
    greeting.classList.remove(HIDDEN_CLASSNAME);
}