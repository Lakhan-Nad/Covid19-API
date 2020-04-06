const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const STATE_TYPE = "administrative_area_level_1";

/**
 * @typedef {Object} GeoLoc
 * @property {number} lat - Latitude
 * @property {number} lng - Longitude
 * @property {String} state State
 * @property {String} place Place
 */

/**
 * @param {String} city City of the Victim
 * @param {String} state State of the Victim
 * @returns {Promise<GeoLoc>} Geo Location Data
 */
async function getGeoData(address, state) {
  let url =
    "https://maps.googleapis.com/maps/api/geocode/json?key=" +
    GOOGLE_API_KEY +
    "&address=" +
    encodeURIComponent(address) +
    "+" +
    encodeURIComponent(state);
  let res = await axios.default.get(url);
  if (res.data.status === "ZERO_RESULTS") {
    throw new Error("No such place exists.");
  } else if (res.data.status !== "OK") {
    throw new Error("Error while connecting to API.");
  }
  let result = res.data.results[0];
  for (let i = 0; i < result.address_components.length; i++) {
    if (result.address_components[i].types[0] === STATE_TYPE) {
      state = result.address_components[i].long_name;
    }
  }
  return {
    state: state,
    place: result.address_components[0].long_name,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
  };
}

module.exports = getGeoData;
