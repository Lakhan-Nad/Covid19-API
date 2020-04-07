export function localDateString(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();

  m = (m + "").padStart(2, "0");
  d = (d + "").padStart(2, "0");

  return d + "/" + m + "/" + y;
}

export function localDateTimeString(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();

  m = (m + "").padStart(2, "0");
  d = (d + "").padStart(2, "0");

  return d + "/" + m + "/" + y + ", " + date.toLocaleTimeString();
}
