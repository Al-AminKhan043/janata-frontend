import React from "react";
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
  
  if (!chartData || !chartData.labels || !Array.isArray(chartData.datasets)) {
    return <div>Loading chart...</div>;
  }

  
  const processedData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.map((value) =>
        typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value
      ),
      yAxisID: dataset.label === "Volume" ? "y2" : "y1", 
      type: dataset.label === "Volume" ? "bar" : "line", 
    })),
  };

  return (
    <div>
      <Line
        data={processedData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Stock Data (Toggle Close/Volume)",
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
            legend: {
              display: true, 
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
            y1: {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: "Close Price",
              },
              grid: {
                drawOnChartArea: false, 
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
                drawOnChartArea: false, 
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
