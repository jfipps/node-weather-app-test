const weatherForm = document.querySelector("form");
const searchVal = document.querySelector("input");
const currentWeather = document.querySelector(".CurrentWeather");
const error = document.querySelector(".Error");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  currentWeather.innerHTML = "Loading...";
  const location = searchVal.value;
  fetch("http://localhost:5001/weather?search=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        error.innerHTML = data.error;
      } else {
        currentWeather.innerHTML = `It is currently ${data.temperature} in ${data.label}`;
      }
    });
  });
});
