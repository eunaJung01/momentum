const toDoForm = document.getElementById("todo-form");
// const toDoInput = toDoForm.querySelector("#todo-form input"); // in theme.js
const toDoList = document.getElementById("todo-list");
const toDoEraseAll = document.querySelector("#second #erase");

const TODOS_KEY = "toDos";

let toDos = [];

function paintToDo(newToDo) {
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;

    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton";
    deleteButton.innerText = "✘";
    deleteButton.addEventListener("click", deleteToDo);

    const doneButton = document.createElement("button");
    doneButton.id = "doneButton";
    doneButton.innerText = "✔︎";
    doneButton.addEventListener("click", doneToDo);

    li.appendChild(span);
    li.appendChild(doneButton);
    li.appendChild(deleteButton);
    toDoList.appendChild(li);

    setToDoTheme();
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // 배열 모양으로 저장
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // filter() : 콜백함수 조건에 해당하는 모든 요소가 있는 배열을 새로 생성
    saveToDos();
}

function doneToDo(event) {
    handleDoneSubmit(event); // in done.js (dones 배열에 push)
    deleteToDo(event);
}

// check localStorage "toDos"
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

// submit event
toDoForm.addEventListener("submit", handleToDoSubmit);
function handleToDoSubmit(event) {
    event.preventDefault(); // submit 후 새로고침 방지 (고유 동작 중지)

    const newToDo = toDoInput.value;
    toDoInput.value = ""; // clear toDo input

    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

// Erase All
toDoEraseAll.addEventListener("click", () => {
    if (confirm("Are you sure?") == true) {
        toDos = [];
        saveToDos();
        window.location.reload(); // 페이지 새로고침
    }
});

setToDoTheme();