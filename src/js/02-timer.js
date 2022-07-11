import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
// flatpickr("#datetime-picker", {});

let currentDate = null;
let selectedDate = null;
let deltaTime = null;
let timer = null;

btnStart.setAttribute('disabled', '');

const addLeadingZero = value => {
    return String(value).padStart(2, '0');
  };
  

  const convertMs = ms => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
    return { days, hours, minutes, seconds };
  };

  const verificationTimer = () => {
    if (deltaTime < 0) {
        window.alert('Please choose a date in the future');
      clearInterval(timer);
      return;
    }
    btnStart.removeAttribute('disabled');
  };

  const updateTimerMarkup = ({ days, hours, minutes, seconds }) => {
    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
  };

  const startTimer = () => {
    timer = setInterval(() => {
      if (deltaTime <= 2000) {
        clearInterval(timer);
      }
      btnStart.setAttribute('disabled', '');
      input.setAttribute('disabled', '');
      currentDate = Date.now();
      deltaTime = selectedDate - currentDate;
      const dataTimer = convertMs(deltaTime);
      updateTimerMarkup(dataTimer);
    }, 1000);
  };


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    currentDate = Date.now();
    selectedDate = selectedDates[0].getTime();
    deltaTime = selectedDate - currentDate;
    verificationTimer();

    console.log(selectedDates[0]);
    },
  };
  flatpickr(input, options)
  btnStart.addEventListener('click', startTimer);
