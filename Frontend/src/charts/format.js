function formatData(data) {
  let labels = [];
  let series = [
    { name: "Recovered", data: [] },
    { name: "Active", data: [] },
    { name: "Died", data: [] }
  ];
  for (let i = 0; i < data.length; i++) {
    labels.push(data[i].date);
    series[0].data.push(data[i].recovered);
    series[1].data.push(data[i].active);
    series[2].data.push(data[i].died);
  }
  return [labels, series];
}

export default formatData;

export function formatStateData(data) {
  let categories = [];
  let series = [
    { name: "Recovered", data: [] },
    { name: "Active", data: [] },
    { name: "Died", data: [] }
  ];
  for (let i = 0; i < data.length; i++) {
    categories.push(data[i].state);
    series[0].data.push(data[i].recovered);
    series[1].data.push(data[i].active);
    series[2].data.push(data[i].died);
  }
  return [categories, series];
}
