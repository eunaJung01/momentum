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
function handleDoneSubmit(event) {

}

const savedDones = localStorage.getItem(DONES_KEY);
if (savedDones !== null) {
    const parsedDones = JSON.parse(savedDones);
    dones = parsedDones;
    parsedDones.forEach(paintDone);
}