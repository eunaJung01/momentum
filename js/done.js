const doneList = document.querySelector("#third #done-list");
const doneEraseAll = document.querySelector("#third #erase");

const DONES_KEY = "dones";

let dones = [];

// dones 배열에 push
let doneID = null;
function handleDoneSubmit(event) {
    doneID = parseInt(event.path[1].id);

    const newDoneObj = {
        text: toDos.find(findID).text,
        id: doneID,
    };
    dones.push(newDoneObj);
    paintDone(newDoneObj);
    saveDones();
}
function findID(element) {
    if (doneID !== null) {
        if (element.id == doneID) { return true; } // === 말고 ==로 했어야 함
    }
}

function paintDone(newDone) {
    const li = document.createElement("li");
    li.id = newDone.id;
    const span = document.createElement("span");
    span.innerText = newDone.text;

    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton";
    deleteButton.innerText = "✘";
    deleteButton.addEventListener("click", deleteDone);

    li.appendChild(span);
    li.appendChild(deleteButton);
    doneList.appendChild(li);

    setDoneTheme();
}

function saveDones() {
    localStorage.setItem(DONES_KEY, JSON.stringify(dones));
}

function deleteDone(event) {
    const li = event.target.parentElement;
    li.remove();
    dones = dones.filter((done) => done.id !== parseInt(li.id)); // 왜 dones 배열에 반영이 안될까.. : done.id가 문자열로 저장되어 있었음 → parseInt(event.path[1].id)로 변경
    saveDones();
}

// check localStorage "dones"
const savedDones = localStorage.getItem(DONES_KEY);
if (savedDones !== null) {
    const parsedDones = JSON.parse(savedDones);
    dones = parsedDones;
    parsedDones.forEach(paintDone);
}

// Erase All
doneEraseAll.addEventListener("click", () => {
    if (confirm("Are you sure?") == true) {
        dones = [];
        saveDones();
        window.location.reload(); // 페이지 새로고침
    }
});

setDoneTheme();