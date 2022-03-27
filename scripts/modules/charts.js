import ApexCharts from "apexcharts";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(...registerables);
Chart.register(ChartDataLabels);

if (sessionStorage.getItem('token')) {
  
  const ctx = document.getElementById("myChart").getContext("2d");
  const ctx1 = document.getElementById("myChart1").getContext("2d");
  const ctx2 = document.getElementById("myChart2").getContext("2d");
  const htmlcheck = document.querySelectorAll("[data-checkbox]");
  
  const dataHead = {
    labels: ["Mobile", "BackEnd", "Designer", "FrontEnd", "QA"],
    datasets: [
      {
        label: "My First Dataset",
        data: [20, 50, 30, 24, 25],
        backgroundColor: [
          "rgb(46, 204, 113)",
          "rgb(37, 204, 247)",
          "rgb(84, 160, 255)",
          "rgb(0, 210, 211)",
          "rgb(253, 114, 114)",
        ],
        hoverOffset: 1,
      },
    ],
  };
  const dataSeniority = {
    labels: ["Medior", "Junior", "Senior"],
    datasets: [
      {
        label: "My First Dataset",
        data: [20, 50, 30],
        backgroundColor: ["#25ccf7", "#fd7272", "#54a0ff"],
        hoverOffset: 1,
      },
    ],
  };
  const data9box = {
    labels: ["2", "3", "5", "6", "7", "8", "9"],
    datasets: [
      {
        label: "My First Dataset",
        data: [20, 50, 30, 24, 25, 5, 15],
        backgroundColor: [
          "#fd7272",
          "#54a0ff",
          "#00d2d3",
          "#1abc9c",
          "#2ecc71",
          "#3498db",
          "#9b59b6",
        ],
        hoverOffset: 1,
      },
    ],
  };
  
  const configHead = {
    type: "pie",
    data: dataHead,
    options: {
      layout: {
        padding: 20,
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const datapoints = ctx.chart.data.datasets[0].data;
            function totalSum(total, datapoint) {
              return total + datapoint;
            }
            const totalValue = datapoints.reduce(totalSum, 0);
            const percentageValue = ((value / totalValue) * 100).toFixed(1);
  
            return `${
              ctx.chart.data.labels[ctx.dataIndex]
            } - ${percentageValue}%`;
          },
        },
      },
    },
  };
  
  const configSeniority = {
    type: "pie",
    data: dataSeniority,
    options: {
      layout: {
        padding: 20,
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const datapoints = ctx.chart.data.datasets[0].data;
            function totalSum(total, datapoint) {
              return total + datapoint;
            }
            const totalValue = datapoints.reduce(totalSum, 0);
            const percentageValue = ((value / totalValue) * 100).toFixed(1);
  
            return `${
              ctx.chart.data.labels[ctx.dataIndex]
            } - ${percentageValue}%`;
          },
        },
      },
    },
  };
  
  const config9box = {
    type: "pie",
    data: data9box,
    options: {
      layout: {
        padding: 20,
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const datapoints = ctx.chart.data.datasets[0].data;
            function totalSum(total, datapoint) {
              return total + datapoint;
            }
            const totalValue = datapoints.reduce(totalSum, 0);
            const percentageValue = ((value / totalValue) * 100).toFixed(1);
  
            return `${
              ctx.chart.data.labels[ctx.dataIndex]
            } - ${percentageValue}%`;
          },
        },
      },
    },
  };
  
  let dataCategories = [];
  let niz = [];
  let cniz = [];
  
  Chart.defaults.color = "#fff";
  const newChartic = new Chart(ctx, configHead);
  const newChartic1 = new Chart(ctx1, configSeniority);
  const newChartic2 = new Chart(ctx2, config9box);
  let dataCat = [];
  
  //BAR CHART
  
  var dataSkills = {
    series: [
      {
        name: "beginner",
        data: [1, 3, 2, 3, 4, 2, 1, 3, 5, 3, 2, 4],
      },
      {
        name: "intermediate",
        data: [2, 3, 2, 3, 4, 3, 1, 3, 5, 3, 2, 4],
      },
      {
        name: "advanced",
        data: [3, 0, 2, 3, 4, 4, 1, 3, 5, 3, 2, 4],
      },
      {
        name: "expert",
        data: [4, 1, 3, 2, 4, 1, 3, 5, 3, 2, 4, 3],
      },
      {
        name: "owner",
        data: [2, 0, 2, 3, 4, 1, 3, 5, 3, 2, 4, 2],
      },
    ],
    xaxis: {
      categories: [
        "asd",
        "sadw",
        "dwas",
        "dszxc",
        "sdadsa",
        "xceee",
        "dszt",
        "qweasd",
        "ds3",
        "qweza",
        "e323fff",
        "dsagwe",
      ],
    },
  };
  
  var options = {
    series: [
      {
        name: "beginner",
        data: [],
      },
      {
        name: "intermediate",
        data: [],
      },
      {
        name: "advanced",
        data: [],
      },
      {
        name: "expert",
        data: [],
      },
      {
        name: "owner",
        data: [],
      },
    ],
    chart: {
      type: "bar",
      height: 500,
      stacked: true,
      stackType: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "",
    },
    yaxis: {
      labels: {
        style: {
          colors: "#e7ecef",
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: "#e7ecef",
        },
      },
      categories: dataCat,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 40,
    },
  };
  
  function loopSkils() {
    dataSkills.xaxis.categories.forEach((val, ind) => {
      dataSkills.series.forEach((dataVal, dataInd) => {
        niz.push(dataVal.data[ind]);
      });
      dataCategories.push(dataSkills.xaxis.categories[ind]);
      cniz.push(niz);
      niz = [];
    });
  }
  loopSkils();
  
  let newChart = new ApexCharts(document.querySelector("#test1"), options);  
  newChart.render();
  
  htmlcheck.forEach((val, ind) => {
    val.addEventListener("change", (event) => {
      if (event.currentTarget.checked) {
        dataCat.push(event.target.id);
        newChart.updateOptions({
          options: {
            series: {
              data: [loadChartData()],
            },
          },
        });
      } else {
        let cutId = dataCat.indexOf(event.target.id);
        dataCat.splice(cutId, 1);
        newChart.updateOptions({
          options: {
            series: {
              data: [loadChartData()],
            },
            xaxis: {
              categories: dataCat,
            },
          },
        });
      }
    });
  });
  
  function loadChartData() {
    for (let i = 0; i < options.series.length; i++) {
      options.series[i].data = [];
    }
    for (let k = 0; k < dataCat.length; k++) {
      for (let m = 0; m < cniz[k].length; m++) {
        options.series[m].data.push(cniz[k][m]);
      }
    }
  }
} else {
  window.location.replace("login.html");
}