// 기본 구성
const init = {
  monList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  today: new Date(),
  monForChange: new Date().getMonth(),
  activeDate: new Date(),

  getFirstDay: (yy, mm) => new Date(yy, mm, 1),
  getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),

  nextMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },

  addZero: (num) => (num < 10) ? '0' + num : num,
  activeDTag: null,
  getIndex: function (node) {
    let index = 0;
    while (node = node.previousElementSibling) {
      index++;
    }
    return index;
  }
};

const calBody = document.querySelector('.calendar-body');
const btnNext = document.querySelector('.btn.next');
const btnPrev = document.querySelector('.btn.prev');

loadYYMM(init.today);
loadDate(init.today.getDate(), init.today.getDay());

/** JavaScipt : type이 불명확 -> 문서화를 통해 상세정보 남기기
 * @param {number} date
 * @param {number} dayIn
 * @param {date} fullDate
*/
function loadDate(date, dayIn) {
  document.querySelector('.selected-date').textContent = date;
  document.querySelector('.selected-day').textContent = init.dayList[dayIn];
}
function loadYYMM(fullDate) {
  let yy = fullDate.getFullYear();
  let mm = fullDate.getMonth();
  let firstDay = init.getFirstDay(yy, mm);
  let lastDay = init.getLastDay(yy, mm);
  
  let markToday;  // for marking todays date
  if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
    markToday = init.today.getDate();
  }

  // change month & year text
  document.querySelector('.calendar-month').textContent = init.monList[mm];
  document.querySelector('.calendar-year').textContent = yy;

  // make calendar
  let trtd = ''; // table
  let startCount; // 날짜
  let countDay = 0; // 실질적으로 표에 입력되는 날짜

  for (let i = 0; i < 6; i++) { // i번째 주
    trtd += '<tr>';
    for (let j = 0; j < 7; j++) { // j요일
      if (i === 0 && !startCount && j === firstDay.getDay()) { // i, startCount가 0일 때 (1일인 경우) && 해당 요일일 때
        startCount = 1; // 달력 시작
      }
      if (!startCount) { // 날짜별 td 생성
        trtd += '<td>';
      } else {
        let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay + 1); // YYYY.MM.DD
        trtd += '<td class="day';
        trtd += (markToday && markToday === countDay + 1) ? ' today" ' : '"'; // 오늘 : .day today
        trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
      }
      trtd += (startCount) ? ++countDay : ''; // startCount == 0 : 1일 전 달력 상의 빈 공간

      if (countDay === lastDay.getDate()) { // 달의 마지막 날에 도달했을 때
        startCount = 0; // 초기화
      }
      trtd += '</td>';
    }
    trtd += '</tr>';
  }
  calBody.innerHTML = trtd;

  if (markToday != null) {
    setCalendarTheme_today(); // 해당 달에 오늘이 있을 때만 테마 적용
  }
}

// button events for change month
btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));

// clicking events in calendar (active date)
calBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('day')) {
    if (init.activeDTag) { // last active date
      init.activeDTag.classList.remove('day-active');
      // 색 초기화
      init.activeDTag.style = null;
      init.activeDTag.classList.toggle('return-date-color');
    }
    let day = Number(e.target.textContent); // new active date
    loadDate(day, e.target.cellIndex);
    e.target.classList.add('day-active');
    init.activeDTag = e.target;
    init.activeDate.setDate(day);
    setCalendarTheme_active(); // 선택한 날짜에 테마 적용

    if (init.nextMonth() === init.today.getMonth() || init.prevMonth() === init.today.getMonth()) {
      setCalendarTheme_today(); // 넘기는 달에 오늘이 있을 때만 테마 적용
    }
  }
});