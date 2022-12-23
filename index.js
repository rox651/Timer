//timer elements
const numbersCtn = document.querySelector(".timer__numbers");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

//buttons
const stop = document.getElementById("stop");
const start = document.getElementById("start");
const reset = document.getElementById("reset");

// counters vars
let counterSeconds = 0;
let counterMinutes = 0;
let counterHours = 0;
let counterDays = 0;

//functions and eventsListener

function formatNumbers(number) {
   return number.toString().padStart(2, "0");
}

window.addEventListener("load", () => {
   //get and put the vars on the dom when the page loads
   counterSeconds = localStorage.getItem("seconds") || 0;
   counterMinutes = localStorage.getItem("minutes") || 0;
   counterHours = localStorage.getItem("hours") || 0;
   counterDays = localStorage.getItem("days") || 0;
   seconds.textContent = formatNumbers(counterSeconds) || 0;
   minutes.textContent = formatNumbers(counterMinutes) || 0;
   hours.textContent = formatNumbers(counterHours) || 0;
   days.textContent = formatNumbers(counterDays) || 0;
});

start.addEventListener("click", () => {
   // add and remove atributes
   start.setAttribute("disabled", "disabled");
   stop.removeAttribute("disabled");
   reset.removeAttribute("disabled");
   numbersCtn.classList.add("colorTimer");

   //setInterval of timer
   const timerInterval = setInterval(() => {
      //verify if the vars are equal to 60, if that is true, then reset to 0, and over start again

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

      //Set vars on the localStorage
      localStorage.setItem("seconds", counterSeconds);
      localStorage.setItem("minutes", counterMinutes);
      localStorage.setItem("hours", counterHours);
      localStorage.setItem("days", counterDays);

      //show the same timer but on the page title
      document.title = `
      ${formatNumbers(counterDays)}:
      ${formatNumbers(counterHours)}:
      ${formatNumbers(counterMinutes)}:
      ${formatNumbers(counterSeconds)}`;
   }, 1000);

   //stop and clean of inverval
   stop.addEventListener("click", () => {
      //add and remove attributes
      clearInterval(timerInterval);
      stop.setAttribute("disabled", "disabled");
      start.removeAttribute("disabled");
      numbersCtn.classList.remove("colorTimer");
   });

   //reset the vars and the variables
   reset.addEventListener("click", () => {
      clearInterval(timerInterval);
      start.removeAttribute("disabled");
      stop.setAttribute("disabled", "disabled");
      numbersCtn.classList.remove("colorTimer");
      counterSeconds = 0;
      counterMinutes = 0;
      counterHours = 0;
      counterDays = 0;
      //reset and set vars on the local storage
      localStorage.setItem("seconds", counterSeconds);
      localStorage.setItem("minutes", counterMinutes);
      localStorage.setItem("hours", counterHours);
      localStorage.setItem("days", counterDays);
      seconds.textContent = formatNumbers(counterSeconds);
      minutes.textContent = formatNumbers(counterMinutes);
      hours.textContent = formatNumbers(counterHours);
      days.textContent = formatNumbers(counterDays);
   });
});
