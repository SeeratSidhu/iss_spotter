const request = require('request-promise-native');

const fetchMyIP = () => {
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = (data) => {
  const ip = JSON.parse(data).ip;
  return request(`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = (location) => {
  const latitude = JSON.parse(location).latitude;
  const longitude = JSON.parse(location).longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    return JSON.parse(data).response;
  });

};
module.exports = { nextISSTimesForMyLocation };