const doneList = document.querySelector("#third #done-list");

const DONES_KEY = "dones";

let dones = [];

function saveDones() {
    localStorage.setItem(DONES_KEY, JSON.stringify(dones));
}

function deleteDone(event) {
    const li = event.target.parentElement;
    li.remove();
    dones = dones.filter((done) => done.id !== parseInt(li.id)); // 왜 dones 배열에 반영이 안될까.. : done.id가 문자열로 저장되어 있었음
    saveDones();
}

function paintDone(newDone) {
    const li = document.createElement("li");
    li.id = newDone.id;
    const span = document.createElement("span");
    span.innerText = newDone.text;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "✘";
    deleteButton.addEventListener("click", deleteDone);

    li.appendChild(span);
    li.appendChild(deleteButton);
    doneList.appendChild(li);
}

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

const savedDones = localStorage.getItem(DONES_KEY);
if (savedDones !== null) {
    const parsedDones = JSON.parse(savedDones);
    dones = parsedDones;
    parsedDones.forEach(paintDone);
}