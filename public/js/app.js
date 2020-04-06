let serachURL = 'http://localhost:3000/weather?location=';
const searchBox = document.querySelector("input[type='text");
const weatherForm = document.querySelector('form');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchBox.value;
  message1.textContent = message2.textContent = '';

  message2.textContent = 'Loading...';

  fetch(serachURL + location)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        message1.textContent = res.error;
      }
      else {
        message1.textContent = res.location;
        message2.textContent = res.forecast;
      }
    })
});

