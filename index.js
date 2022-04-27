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
      seconds.textContent = counterSeconds.toString().padStart(2, "0");
    }
    if (counterSeconds == 60) {
      counterSeconds = 0;
      seconds.textContent = counterSeconds.toString().padStart(2, "0");
      counterMinutes++;
      minutes.textContent = counterMinutes.toString().padStart(2, "0");
    }
    if (counterMinutes == 60) {
      counterMinutes = 0;
      minutes.textContent = counterMinutes.toString().padStart(2, "0");
      counterHours++;
      hours.textContent = counterHours.toString().padStart(2, "0");
    }
    if (counterHours == 24) {
      counterHours = 0;
      hours.textContent = counterHours.toString().padStart(2, "0");
      counterDays++;
      days.textContent = counterDays.toString().padStart(2, "0");
    }

    //Set vars on the localStorage
    localStorage.setItem("seconds", counterSeconds);
    localStorage.setItem("minutes", counterMinutes);
    localStorage.setItem("hours", counterHours);
    localStorage.setItem("days", counterDays);

    //show the same timer but on the page title
    document.title = `Timer:
      ${notNull(counterDays).toString().padStart(2, "0")}:
      ${notNull(counterHours).toString().padStart(2, "0")}:
      ${notNull(counterMinutes).toString().padStart(2, "0")}:
      ${notNull(counterSeconds).toString().padStart(2, "0")}`;
  }, 1000);

  //stop and clean of inverval
  stop.addEventListener("click", () => {
    //add and remove attributes
    clearInterval(timerInterval);
    stop.setAttribute("disabled", "disabled");
    start.removeAttribute("disabled");
  });

  //reset the vars and the variables
  reset.addEventListener("click", () => {
    clearInterval(timerInterval);
    start.removeAttribute("disabled");
    stop.setAttribute("disabled", "disabled");
    counterSeconds = 0;
    counterMinutes = 0;
    counterHours = 0;
    counterDays = 0;
    //reset and set vars on the local storage
    localStorage.setItem("seconds", counterSeconds);
    localStorage.setItem("minutes", counterMinutes);
    localStorage.setItem("hours", counterHours);
    localStorage.setItem("days", counterDays);
    seconds.textContent = notNull(counterSeconds).toString().padStart(2, "0");
    minutes.textContent = notNull(counterMinutes).toString().padStart(2, "0");
    hours.textContent = notNull(counterHours).toString().padStart(2, "0");
    days.textContent = notNull(counterDays).toString().padStart(2, "0");
  });
});

window.addEventListener("load", () => {
  //get and put the vars on the dom when the page loads
  counterSeconds = localStorage.getItem("seconds");
  counterMinutes = localStorage.getItem("minutes");
  counterHours = localStorage.getItem("hours");
  counterDays = localStorage.getItem("days");
  seconds.textContent = notNull(counterSeconds).toString().padStart(2, "0");
  minutes.textContent = notNull(counterMinutes).toString().padStart(2, "0");
  hours.textContent = notNull(counterHours).toString().padStart(2, "0");
  days.textContent = notNull(counterDays).toString().padStart(2, "0");
});

function notNull(number) {
  return number == "null" || number == "NaN" ? "00" : number;
}
