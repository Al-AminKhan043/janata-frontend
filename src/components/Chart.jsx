import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required elements for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ chartData }) => {
  const chartRef = useRef(null); // Reference to store the chart instance

  // Clean up and destroy the chart instance when data changes
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, [chartData]); // Re-run the effect when chartData changes

  // Return early if chartData or chartData.labels or chartData.datasets is missing
  if (!chartData || !chartData.labels || !Array.isArray(chartData.datasets)) {
    return <div>Loading chart...</div>; // Or any other loading indicator
  }

  return (
    <div>
      <Line
        ref={chartRef} // Assign the ref to the chart
        data={chartData} // The chart data is passed as a prop
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Multi-Axis Chart Example", // Customize your chart title here
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: "Close",
              },
            },
            y2: {
              type: "linear",
              position: "right",
              title: {
                display: true,
                text: "Volume",
              },
              grid: {
                drawOnChartArea: false, // Disable grid lines for the secondary y-axis
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
