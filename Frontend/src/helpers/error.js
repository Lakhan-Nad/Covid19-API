export default function errorText(err) {
  if (typeof err === "object" && (err.message || err.status)) {
    if (err.message && err.status) {
      return err.status + ": " + err.message;
    } else if (err.message) {
      return err.message;
    } else {
      return err.status;
    }
  } else {
    return JSON.stringify(err);
  }
}
