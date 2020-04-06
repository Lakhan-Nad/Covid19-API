import { ACTIVE, RECOVERED, DIED, MIXED } from "../helpers/constant";

/**
 * @param {Number} lng
 * @param {Number} lat
 * @param {("recovered" | "affected"  | "died")} status
 * @returns {GeoJSON.Feature}
 */
export function makeGeoJSONFeature(lng, lat, status) {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat]
    },
    properties: {
      status: status,
      count: 1,
      cluster: false,
      recovered: status === RECOVERED ? 1 : 0,
      active: status === ACTIVE ? 1 : 0,
      died: status === DIED ? 1 : 0
    }
  };
}

export function reduceClusters(accumulated, props) {
  accumulated.cluster = true;
  accumulated.count += props.count;
  accumulated.recovered += props.recovered;
  accumulated.active += props.active;
  accumulated.died += props.died;
  if (accumulated.status !== props.status) {
    accumulated.status = MIXED;
  }
}

/**
 * @typedef {Object} Properties
 * @property {("recovered" | "active" | "died" | "mixed")} status
 * @property {Number} count
 * @property {Boolean} cluster
 * @property {Number} recovered
 * @property {Number} affected
 * @property {Number} died
 */
