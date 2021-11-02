/*
화면 이동 구현하기
1st page -> 2nd page으로 넘어갈 때만
(2nd -> 1st으로는 테마가 변경되기 때문에 부자연스러울듯)

1st page가 위로 밀려나가면서 2nd page가 올라오는 느낌으로
한 4초정도??

transform.translate(x,y) 사용하기
https://codingbroker.tistory.com/54

이동 애니메이션 여러개 만들어서 랜덤으로 실행하는 것도 좋을 듯
*/

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
    // window.location.reload(); // 페이지 새로고침

    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName); // save in local storage
    paintGreetings(userName);
    loginInput.readOnly = true;
    
    movePage();
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
    /*
    1st, 2nd page : 초기 위치
    top 부분만 변경됨

    #page1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
    #page2 {
    position: absolute;
    top: 100%;
    left: 75px;
    display: block;
    height: auto;
    }
    */

    page1.style.top = "50%";
    page2.style.top = "100%";
}

function paint2ndPage(userName) {
    paintGreetings(userName);
    /*
    1st page : .hidden 추가 또는 위 안보이는 공간으로 옮기기
    2nd page : position: absolute; top: 6px
    */
    page1.classList.add(HIDDEN_CLASSNAME);
    page2.style.top = "6px";
}

function paintGreetings(userName) {
    greeting.innerText = `Hello ${userName}`; // "Hello " + userName
    greeting.classList.remove(HIDDEN_CLASSNAME);
}