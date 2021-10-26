const clocks = document.querySelectorAll(".clock");

setClockTheme();

function getClock() {
    const date = new Date();
    const hours  = String(date.getHours()).padStart(2,"0");
    const minutes  = String(date.getMinutes()).padStart(2,"0");
    const seconds  = String(date.getSeconds()).padStart(2,"0");
    clocks.forEach((clock) => {
        clock.innerText = `${hours}:${minutes}:${seconds}`; // hh:mm:ss
    });
}
getClock();
setInterval(getClock, 1000);