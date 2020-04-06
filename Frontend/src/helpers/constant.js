export const ACTIVE = "active";
export const RECOVERED = "recovered";
export const DIED = "died";

export const MIXED = "mixed";

export const D_COLOR = "#af362d";
export const R_COLOR = "#3d8614";
export const A_COLOR = "#77b6ea";
export const M_COLOR = "#f05e23";

/**
 * Get Color for status
 * @param {("recovered" | "active" | "died")} status
 */
export function selectColor(status) {
  if (status === DIED) {
    return D_COLOR;
  } else if (status === RECOVERED) {
    return R_COLOR;
  } else if (status === ACTIVE) {
    return A_COLOR;
  }
}
