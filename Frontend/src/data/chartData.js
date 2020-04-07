import stateList from "../helpers/stateList";

const data = [
  [19, 4, 1],
  [5, 1, 3],
  [8, 2, 2],
  [11, 4, 3],
  [12, 9, 4],
  [3, 9, 2],
  [13, 4, 2],
  [2, 2, 1],
  [7, 1, 2],
  [12, 9, 2],
  [6, 3, 1],
  [3, 7, 3],
  [5, 4, 2],
  [1, 2, 3],
  [2, 6, 2],
  [17, 5, 2],
  [7, 9, 3],
  [19, 3, 3],
  [18, 4, 3],
  [14, 2, 4],
  [5, 4, 3],
  [1, 9, 4],
  [10, 5, 2],
  [7, 1, 1],
  [13, 8, 4],
  [14, 2, 2],
  [13, 9, 3],
  [18, 1, 4],
  [14, 5, 3],
  [3, 6, 4],
  [17, 1, 1],
  [11, 2, 3],
  [13, 1, 1],
  [3, 4, 4],
  [19, 7, 2],
  [10, 5, 3],
  [17, 3, 1],
  [2, 2, 3],
  [3, 1, 3],
  [12, 9, 2],
  [16, 4, 3],
  [2, 3, 4],
  [11, 1, 1],
  [17, 6, 4],
  [5, 5, 4],
  [19, 7, 1],
  [8, 1, 1],
  [5, 5, 4],
  [1, 8, 2],
  [8, 7, 4],
  [5, 2, 1],
  [13, 1, 4],
  [4, 1, 1],
  [14, 5, 3],
  [9, 4, 3],
  [16, 7, 2],
  [3, 1, 3],
  [17, 8, 4],
  [17, 7, 1],
  [1, 4, 1],
];

const startDate = new Date("2020/02/27");

export const Data = [];

for (let i = 0; i < data.length; i++) {
  let curDate = new Date(startDate.getTime() + i * 60 * 60 * 24 * 1000)
    .toISOString()
    .slice(0, 10);
  Data.push({
    date: curDate,
    active: data[i][0],
    recovered: data[i][1],
    died: data[i][2],
  });
}

export const stateData = [];

for (let i = 0; i < data.length && i < stateList.length; i++) {
  stateData.push({
    state: stateList[i],
    active: data[i][0],
    recovered: data[i][1],
    died: data[i][2],
  });
}
