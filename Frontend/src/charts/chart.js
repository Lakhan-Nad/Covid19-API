import React from "react";
import { chartLineOptions, chartAreaOptions, chartBarOptions } from "./options";
import Chart from "react-apexcharts";

export function LineChart({ series, labels, width, height }) {
  let options = JSON.parse(JSON.stringify(chartLineOptions));
  options.labels = labels;
  return (
    <Chart
      series={series}
      type="area"
      options={options}
      width={width}
      height={height}
    />
  );
}

export function AreaChart({ series, labels, width, height }) {
  let options = JSON.parse(JSON.stringify(chartAreaOptions));
  options.labels = labels;
  return (
    <Chart
      series={series}
      type="area"
      options={options}
      width={width}
      height={height}
    />
  );
}

export function BarChart({ series, categories, width, height }) {
  let options = JSON.parse(JSON.stringify(chartBarOptions));
  options.xaxis.categories = categories;
  return (
    <Chart
      series={series}
      type="bar"
      options={options}
      width={width}
      height={height}
    />
  );
}
