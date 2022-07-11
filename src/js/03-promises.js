import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formPromises = document.querySelector(".form");

let delay = null;
let step = null;
let position = 0;
let amount = [];

formPromises.addEventListener("submit", onSubmit)


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onSubmit(event) {
  event.preventDefault();

   
  const formEl = event.currentTarget.elements;

  delay = Number(formEl.delay.value);
  step = Number(formEl.step.value);

  for (let i = 1; i <= Number(formEl.amount.value); i += 1) {
    amount.push(i);
  }

  amount.map(number => {
    position = number;
    delay = position === 1 ? delay : (delay += step);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .then(() => {})
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      .finally(() => {
        amount = [];
      });
  });
}