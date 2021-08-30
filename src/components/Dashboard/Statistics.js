import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Button from '@material-ui/core/Button';
import './Statistics.scss';
import TextField from '@material-ui/core/TextField';

const chartConfig = {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

const CHART_COLORS = {
  red: 'red',
  Orange: 'orange',
  yellow: 'yellow',
  green: 'green',
};

const config = {
  type: 'pie',
  data: {
    labels: ['Red', 'Orange', 'Yellow', 'Green'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [5, 23, 10, 6],
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart',
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
      new Chart(chartContainer.current, config);
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
      const newChartInstance = new Chart(chartContainer4.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer4]);

  return (
    <div style={{ maxWidth: '522px' }}>
      <form className="Statistics__calendar" noValidate>
        <TextField
          id="datetime-local"
          label="Choose date"
          type="datetime-local"
          defaultValue="2021-01-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>

      <div className="Statistics__refresh-button">
        <Button onClick={onButtonClick} variant="outlined" color="primary">
          Refresh Data from Server
        </Button>
      </div>
      <div> Daily Milk Delivery Quantity (total delivered on this date) </div>
      <canvas ref={chartContainer2} />
      <div>
        Per Agent Milk Delivery Quantity (total delivered by selected Agent
        today/any day selection from Calender drop down)
      </div>
      <canvas ref={chartContainer} />
      <div>
        {' '}
        Daily Milk Delivery Quantity by Type last month (cow/buffallo / ghee)
      </div>
      <canvas ref={chartContainer4} />
    </div>
  );
}
