import { A_COLOR, R_COLOR, D_COLOR } from "../helpers/constant";

export const chartLineOptions = {
  xaxis: {
    type: "datetime",
    labels: {
      dateFormatter: {
        year: "yyyy",
        month: "MMM yy",
        day: "dd MMM"
      }
    }
  },
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    onItemHover: {
      highlightDataSeries: true
    },
    fontSize: "18px",
    fontWeight: "700",
    markers: {
      height: 20,
      width: 20
    }
  },
  stroke: {
    curve: "smooth"
  },
  tooltip: {
    onDatasetHover: {
      highlightDataSeries: true
    },
    fixed: {
      enabled: true,
      position: "topLeft",
      offsetX: 80,
      offsetY: 30
    }
  },
  colors: [R_COLOR, A_COLOR, D_COLOR],
  chart: {
    type: "area",
    toolbar: {
      tools: {
        selection: false,
        zoom: false
      },
      autoSelected: "pan"
    }
  },
  yaxis: {
    title: {
      text: "Covid-19 Cases",
      style: {
        fontSize: "20px"
      }
    },
    tickAmount: 9
  }
};

export const chartBarOptions = {
  xaxis: {
    type: "category",
    labels: {
      show: true
    },
    title: {
      text: "States and Union Territories",
      style: {
        fontSize: "16px",
        fontWeight: "600"
      }
    },
    tickAmount: 8
  },
  tooltip: {
    followCursor: true
  },
  colors: [R_COLOR, A_COLOR, D_COLOR],
  chart: {
    type: "bar",
    stacked: true,
    toolbar: {
      show: false
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "14px",
        fontWeight: "700"
      },
      maxWidth: 200
    }
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right"
  },
  grid: {
    show: true,
    borderColor: "#90A4AE",
    strokeDashArray: 0,
    position: "back",
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  }
};

export const chartAreaOptions = {
  xaxis: {
    type: "datetime",
    labels: {
      show: false
    },
    title: {
      text: "Time",
      style: {
        fontSize: "20px",
        fontWeight: "700"
      }
    }
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
    onItemHover: {
      highlightDataSeries: true
    },
    onItemClick: {
      toggleDataSeries: false
    },
    fontSize: "18px",
    itemMargin: {
      horizontal: 10
    }
  },
  stroke: {
    curve: "smooth",
    lineCap: "round"
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    onDatasetHover: {
      highlightDataSeries: true
    },
    followCursor: true
  },
  colors: [R_COLOR, A_COLOR, D_COLOR],
  chart: {
    type: "area",
    stacked: true,
    toolbar: {
      tools: {
        zoom: false
      },
      autoSelected: "pan"
    }
  },
  yaxis: {
    title: {
      text: "Covid-19 Growth",
      style: {
        fontSize: "18px"
      }
    },
    tickAmount: 5
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.9
    }
  },
  grid: {
    show: true,
    borderColor: "#90A4AE",
    strokeDashArray: 0,
    position: "back",
    yaxis: {
      lines: {
        show: true
      }
    }
  }
};
