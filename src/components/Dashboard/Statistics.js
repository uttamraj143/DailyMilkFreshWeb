import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./Statistics.scss";
import TextField from "@mui/material/TextField";
import { ReactComponent as GraphIcon } from "components/svgs/graphIncrease.svg";

const chartConfig = {
  type: "bar",
  data: {
    labels: ["25th", "26th", "27th", "28th", "29th", "30th"],
    datasets: [
      {
        label: "# of Votes",
        data: [22, 23, 23, 25, 21, 28],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      // {
      //   label: "# of Votes",
      //   data: [12, 13, 31, 21, 21, 22],
      //   backgroundColor: [
      //     "rgba(255, 99, 132, 0.2)",
      //     "rgba(54, 162, 235, 0.2)",
      //     "rgba(255, 206, 86, 0.2)",
      //     "rgba(75, 192, 192, 0.2)",
      //     "rgba(153, 102, 255, 0.2)",
      //     "rgba(255, 159, 64, 0.2)",
      //   ],
      //   borderColor: [
      //     "rgba(255, 99, 132, 1)",
      //     "rgba(54, 162, 235, 1)",
      //     "rgba(255, 206, 86, 1)",
      //     "rgba(75, 192, 192, 1)",
      //     "rgba(153, 102, 255, 1)",
      //     "rgba(255, 159, 64, 1)",
      //   ],
      //   borderWidth: 1,
      // },
    ],
  },
  options: {
    scales: {
      y: { min: 16 },
    },
    barThickness: 16,
    barPercentage: 0.5,
    borderRadius: 5,
  },
};

const milkTypeProduct = {
  type: "bar",
  data: {
    labels: ["cow", "buffallo", "Ghee"],
    datasets: [
      {
        label: "# of Votes",
        data: [122, 99, 23],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        min: 19,
      },
    },
  },
};

const chartColors = ["red", "orange", "yellow", "green"];
const agentChartconfig = {
  type: "doughnut",
  data: {
    labels: ["agent 1", "agent 2", "agent 3", "agent 4"],
    datasets: [
      {
        label: "Dataset 1",
        data: [5, 23, 10, 6],
        backgroundColor: chartColors.map((i) => i),
      },
    ],
  },
  options: {
    cutout: "80%",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Pie Chart",
      },
    },
  },
};

export default function ProductionStatistics() {
  const [chartInstance, setChartInstance] = useState(null);
  const chartContainer = useRef(null);
  const chartContainer2 = useRef(null);
  const chartContainer4 = useRef(null);

  const onButtonClick = () => {
    const data = [15, 39, 13, 5, 2, 38];
    updateDataset(0, data);
  };

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      new Chart(chartContainer.current, agentChartconfig);
    }
  }, [chartContainer]);

  useEffect(() => {
    if (chartContainer2 && chartContainer2.current) {
      const newChartInstance = new Chart(chartContainer2.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer2]);

  useEffect(() => {
    if (chartContainer4 && chartContainer4.current) {
      const newChartInstance = new Chart(
        chartContainer4.current,
        milkTypeProduct
      );
      setChartInstance(newChartInstance);
    }
  }, [chartContainer4]);

  return (
    <div className="Statistics__main-container">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <GraphIcon /> {"  "} Admin Panel
        </div>
        <div>
          {/* <a
            className="Users__refresh-button"
            target="_blank"
            href="https://wa.me?send?text=Hello%20World!"
          >
            Whatsapp
          </a> */}
        </div>
      </div>

      <form className="" noValidate>
        <TextField
          id="date"
          label="Date "
          type="date"
          defaultValue={new Date().toLocaleDateString("fr-CA")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <div onClick={(e) => onButtonClick(e)}>
        Daily Milk Delivery Quantity (total delivered on this date)
        <canvas ref={chartContainer2} />
      </div>
      <div>
        Per Agent Milk Delivery Quantity (total delivered by selected Agent
        today/any day selection from Calender drop down)
      </div>
      <div className="Statistics__donough">
        <canvas ref={chartContainer} />
      </div>
      <div>
        {" "}
        Daily Milk Delivery Quantity by Type last month (cow/buffallo / ghee)
      </div>
      <canvas ref={chartContainer4} />
    </div>
  );
}
