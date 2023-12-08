let timerInterval;

const numbersCtn = document.querySelector(".timer__numbers");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const stop = document.getElementById("stop");
const start = document.getElementById("start");
const reset = document.getElementById("reset");

let counterSeconds = 0;
let counterMinutes = 0;
let counterHours = 0;
let counterDays = 0;

function formatNumbers(number) {
   return Number(number).toString().padStart(2, "0");
}

function getLocalStorageTime() {
   counterSeconds = localStorage.getItem("seconds");
   counterMinutes = localStorage.getItem("minutes");
   counterHours = localStorage.getItem("hours");
   counterDays = localStorage.getItem("days");
}

function setLocalStorageTime() {
   localStorage.setItem("seconds", counterSeconds);
   localStorage.setItem("minutes", counterMinutes);
   localStorage.setItem("hours", counterHours);
   localStorage.setItem("days", counterDays);
}

function setTimeTextContent() {
   seconds.textContent = formatNumbers(counterSeconds) || 0;
   minutes.textContent = formatNumbers(counterMinutes) || 0;
   hours.textContent = formatNumbers(counterHours) || 0;
   days.textContent = formatNumbers(counterDays) || 0;
}

function setTimeInTabTitle() {
   document.title = `
   ${formatNumbers(counterDays)}:
   ${formatNumbers(counterHours)}:
   ${formatNumbers(counterMinutes)}:
   ${formatNumbers(counterSeconds)}`;
}

function onLoadWindow() {
   getLocalStorageTime();
   setTimeTextContent();
}

function onClickStartButton() {
   start.setAttribute("disabled", "disabled");
   stop.removeAttribute("disabled");
   reset.removeAttribute("disabled");
   numbersCtn.classList.add("colorTimer");

   timerInterval = setInterval(() => {
      if (counterSeconds !== 60) {
         counterSeconds++;
         seconds.textContent = formatNumbers(counterSeconds);
      }
      if (counterSeconds == 60) {
         counterSeconds = 0;
         seconds.textContent = formatNumbers(counterSeconds);
         counterMinutes++;
         minutes.textContent = formatNumbers(counterMinutes);
      }
      if (counterMinutes == 60) {
         counterMinutes = 0;
         minutes.textContent = formatNumbers(counterMinutes);
         counterHours++;
         hours.textContent = formatNumbers(counterHours);
      }
      if (counterHours == 24) {
         counterHours = 0;
         hours.textContent = formatNumbers(counterHours);
         counterDays++;
         days.textContent = formatNumbers(counterDays);
      }
      setLocalStorageTime();
      setTimeInTabTitle();
   }, 1000);
}

function onClickStopButton() {
   clearInterval(timerInterval);
   stop.setAttribute("disabled", "disabled");
   start.removeAttribute("disabled");
   numbersCtn.classList.remove("colorTimer");
}

function onClickResetButton() {
   const isAllCounterZero =
      counterDays === 0 && counterHours === 0 && counterMinutes === 0 && counterSeconds === 0;

   if (isAllCounterZero) return;

   clearInterval(timerInterval);
   start.removeAttribute("disabled");
   stop.setAttribute("disabled", "disabled");
   numbersCtn.classList.remove("colorTimer");

   counterSeconds = 0;
   counterMinutes = 0;
   counterHours = 0;
   counterDays = 0;

   setLocalStorageTime();
   setTimeTextContent();
}

window.addEventListener("load", onLoadWindow);

start.addEventListener("click", onClickStartButton);

stop.addEventListener("click", onClickStopButton);

reset.addEventListener("click", onClickResetButton);
