import { A_COLOR, R_COLOR, D_COLOR } from "../helpers/constant";

export const chartLineOptions = {
  xaxis: {
    type: "datetime",
    labels: {
      dateFormatter: {
        year: "yyyy",
        month: "MMM yy",
        day: "dd MMM",
      },
    },
    title: {
      text: "",
      style: {
        fontSize: "24px",
        fontWeight: "900",
      },
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "center",
    onItemHover: {
      highlightDataSeries: true,
    },
    fontSize: "18px",
    fontWeight: "700",
    offsetY: 20,
    itemMargin: {
      horizontal: 20,
    },
    markers: {
      height: 15,
      width: 15,
    },
  },
  stroke: {
    curve: "smooth",
  },
  tooltip: {
    onDatasetHover: {
      highlightDataSeries: true,
    },
    fixed: {
      enabled: true,
      position: "topLeft",
      offsetX: 80,
      offsetY: 30,
    },
  },
  colors: [D_COLOR, R_COLOR, A_COLOR],
  chart: {
    type: "line",
    toolbar: {
      tools: {
        selection: false,
        zoom: false,
      },
      autoSelected: "pan",
    },
  },
  yaxis: {
    title: {
      text: "Covid-19 Total Cases",
      style: {
        fontSize: "20px",
      },
    },
    tickAmount: 9,
  },
};

export const chartBarOptions = {
  xaxis: {
    type: "category",
    labels: {
      show: true,
    },
    title: {
      text: "",
      style: {
        fontSize: "16px",
        fontWeight: "600",
      },
    },
    tickAmount: 8,
  },
  tooltip: {
    followCursor: true,
  },
  colors: [D_COLOR, R_COLOR, A_COLOR],
  chart: {
    type: "bar",
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "14px",
        fontWeight: "700",
      },
      maxWidth: 200,
    },
    title: {
      text: "Indian States and Union Territories",
      offsetX: -35,
      style: {
        fontSize: "20px",
        fontWeight: "700",
      },
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
    fontSize: "22px",
    fontWeight: "900",
    offsetY: 20,
    itemMargin: {
      horizontal: 10,
    },
  },
  grid: {
    show: true,
    borderColor: "#90A4AE",
    strokeDashArray: 0,
    position: "back",
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
};

export const chartAreaOptions = {
  xaxis: {
    type: "datetime",
    labels: {
      show: true,
      dateFormatter: {
        year: "yyyy",
        month: "MMM yy",
        day: "dd MMM",
      },
    },
    title: {
      text: "",
      style: {
        fontSize: "20px",
        fontWeight: "700",
      },
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
    onItemHover: {
      highlightDataSeries: true,
    },
    onItemClick: {
      toggleDataSeries: false,
    },
    fontSize: "22px",
    fontWeight: "900",
    offsetY: 30,
    offsetX: 20,
    itemMargin: {
      horizontal: 10,
    },
  },
  stroke: {
    curve: "smooth",
    lineCap: "round",
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    onDatasetHover: {
      highlightDataSeries: true,
    },
    followCursor: true,
  },
  colors: [D_COLOR, R_COLOR, A_COLOR],
  chart: {
    type: "area",
    toolbar: {
      tools: {
        zoom: false,
      },
      autoSelected: "pan",
    },
  },
  yaxis: {
    title: {
      text: "Covid-19 New Cases",
      style: {
        fontSize: "18px",
      },
    },
    tickAmount: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.9,
    },
  },
  grid: {
    show: true,
    borderColor: "#90A4AE",
    strokeDashArray: 0,
    position: "back",
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
};
