import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

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
  const chartContainer = useRef(null);
  const chartContainer2 = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, config);
    }
  }, [chartContainer]);

  useEffect(() => {
    if (chartContainer2 && chartContainer2.current) {
      const newChartInstance = new Chart(chartContainer2.current, chartConfig);
    }
  }, [chartContainer2]);

  return (
    <div style={{ maxWidth: '522px' }}>
      <canvas ref={chartContainer2} />
      <canvas ref={chartContainer} />
    </div>
  );
}
