const done = document.querySelector("#third #done");

let dones = [];
const DONES_KEY = "dones";

function saveDones() {
    localStorage.setItem(DONES_KEY, JSON.stringify(dones));
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
    toDoList.appendChild(li);
}

// dones 배열에 push
let doneID = null;
function handleDoneSubmit(event) {
    doneID = event.path[1].id;
    console.log(doneID);
    const done = toDos.find(findID);
    console.log(done);
    console.log(done.text);

}

function findID(element) {
    if (doneID !== null) {
        if (element.id === doneID) { return true; }
    }
}

const savedDones = localStorage.getItem(DONES_KEY);
if (savedDones !== null) {
    const parsedDones = JSON.parse(savedDones);
    dones = parsedDones;
    parsedDones.forEach(paintDone);
}