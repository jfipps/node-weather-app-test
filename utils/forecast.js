const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = encodeURI(
    "http://api.weatherstack.com/current?access_key=4284f87fd676149a0784166089febe8b&query=" +
      latitude +
      "," +
      longitude +
      "&units=f"
  );

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { feelslike, temperature } = body.current;
      const weather = { feelslike, temperature };
      callback(undefined, weather);
    }
  });
};

module.exports = forecast;
