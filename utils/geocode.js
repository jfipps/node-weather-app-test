const request = require("postman-request");

const geocode = (address, callback) => {
  const url = encodeURI(
    "http://api.positionstack.com/v1/forward?access_key=f5f77c39cebd4b3e25fba021f25a6dca&query=" +
      address +
      "&limit=1"
  );
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Unable to find location, please try another search", undefined);
    } else {
      const { longitude, latitude, label } = body.data[0];
      const geolocation = { longitude, latitude, label };
      callback(undefined, geolocation);
    }
  });
};

module.exports = geocode;
