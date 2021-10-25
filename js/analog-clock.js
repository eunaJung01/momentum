const analog_clock = document.querySelector(".analog-clock");

// creating elements
const innerClockDiv = document.createElement("div"); // Dial
innerClockDiv.className = "inner-clock-face";
analog_clock.appendChild(innerClockDiv);

const hourDiv = document.createElement("div"); // 시침
hourDiv.classList.add("hand", "hour-hand");
innerClockDiv.appendChild(hourDiv);

const minDiv = document.createElement("div"); // 분침
minDiv.classList.add("hand", "min-hand");
innerClockDiv.appendChild(minDiv);

const secDiv = document.createElement("div"); // 초침
secDiv.classList.add("hand", "second-hand");
innerClockDiv.appendChild(secDiv);

const circle = document.createElement("div"); // 중앙원
circle.classList.add("inner-clock-face-circle");
innerClockDiv.appendChild(circle);

setAnalogClockTheme();

// 무소음 시계 구현
function setDate() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds(); // 틱 없이 구현하기 위해선 필요

    // degrees
    const hDeg = h * (360 / 12);
    const mDeg = m * (360 / 60);
    const sDeg = s * (360 / 60);
    const msDeg = ms * (6 / 1000);

    // rotate
    hourDiv.style.transform = `rotate(${hDeg + (mDeg / 360) * (360 / 12) + 90}deg)`;
    minDiv.style.transform = `rotate(${mDeg + (sDeg / 360) * (360 / 60) + 90}deg)`;
    secDiv.style.transform = `rotate(${msDeg + sDeg + 90}deg)`;
}

setInterval(setDate, 1);
setDate();