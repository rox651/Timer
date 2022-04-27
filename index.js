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
const lessThanTen = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

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
      seconds.textContent = lessThanTen(counterSeconds);
    }
    if (counterSeconds == 60) {
      counterSeconds = 0;
      seconds.textContent = lessThanTen(counterSeconds);
      counterMinutes++;
      minutes.textContent = lessThanTen(counterMinutes);
    }
    if (counterMinutes == 60) {
      counterMinutes = 0;
      minutes.textContent = lessThanTen(counterMinutes);
      counterHours++;
      hours.textContent = lessThanTen(counterHours);
    }
    if (counterHours == 24) {
      counterHours = 0;
      hours.textContent = lessThanTen(counterHours);
      counterDays++;
      days.textContent = lessThanTen(counterDays);
    }

    document.title = `Timer: ${lessThanTen(counterDays)}:${lessThanTen(
      counterHours
    )}:${lessThanTen(counterMinutes)}:${lessThanTen(counterSeconds)}`;
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

    seconds.textContent = lessThanTen(counterSeconds);
    minutes.textContent = lessThanTen(counterMinutes);
    hours.textContent = lessThanTen(counterHours);
    days.textContent = lessThanTen(counterDays);
  });
});
