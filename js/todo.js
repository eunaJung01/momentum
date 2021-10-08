const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "toDos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // 배열 모양으로 저장
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // filter() : 콜백함수 조건에 해당하는 모든 요소가 있는 배열을 새로 생성
    saveToDos();
}

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
    doneButton.addEventListener("click", doneToDo); // js/done.js

    li.appendChild(span);
    li.appendChild(doneButton);
    li.appendChild(deleteButton);
    toDoList.appendChild(li);
}

function doneToDo(event) {
    handleDoneSubmit(event); // dones 배열에 push
    saveDones();

    // const li = event.target.parentElement;
    // li.remove();
    // toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // filter() : 콜백함수 조건에 해당하는 모든 요소가 있는 배열을 새로 생성
    // saveToDos();
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

setToDoTheme();