export function formatData(data) {
  let labels = [];
  let series = [
    { name: "Died", data: [] },
    { name: "Recovered", data: [] },
    { name: "Active", data: [] },
  ];
  for (let i = 0; i < data.length; i++) {
    labels.push(data[i].date);
    series[0].data.push(data[i].died);
    series[1].data.push(data[i].recovered);
    series[2].data.push(data[i].active);
  }
  return [labels, series];
}

export function formatStateData(data) {
  let categories = [];
  let series = [
    { name: "Died", data: [] },
    { name: "Recovered", data: [] },
    { name: "Active", data: [] },
  ];
  for (let i = 0; i < data.length; i++) {
    categories.push(data[i].state);
    series[0].data.push(data[i].died);
    series[1].data.push(data[i].recovered);
    series[2].data.push(data[i].active);
  }
  return [categories, series];
}
