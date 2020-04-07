formatDate = (dateNum) => {
  let date = new Date(dateNum);
  let month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

tommorow = (date) => {
  let epoch = date.getTime() / 1000;
  epoch += 24 * 60 * 60;
  epoch *= 1000;
  let nextDate = new Date(epoch);
  return formatDate(nextDate);
};

yersterday = (date) => {
  let epoch = date.getTime() / 1000;
  epoch -= 24 * 60 * 60;
  epoch *= 1000;
  let nextDate = new Date(epoch);
  return formatDate(nextDate);
};

today = () => {
  let today = new Date(Date.now());
  return formatDate(today);
};

module.exports = {
  today,
  tommorow,
  yersterday,
  formatDate,
};
