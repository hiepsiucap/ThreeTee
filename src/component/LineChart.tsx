/** @format */

import { Component } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import the ApexOptions type

// Define the props interface for categories and multiple data sets
interface BasicProps {
  categories: string[];
  data: number[];
  data1: number[]; // Add data1 to the props
}

interface ChartState {
  options: ApexOptions; // Use ApexOptions for correct typing
  series: {
    name: string;
    data: number[];
  }[];
}

class BasicLine extends Component<BasicProps, ChartState> {
  constructor(props: BasicProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-line",
          fontFamily: "Inter, sans-serif",
          type: "line", // Ensure 'type' is one of the allowed string literals
        },
        xaxis: {
          categories: props.categories, // Use the categories prop
        },
        stroke: {
          curve: "smooth", // Optional: for a smooth curve line
        },
        colors: ["#B1E3FF", "#A1E3CB"], // Colors for the lines (add more if needed)
      },
      series: [
        {
          name: "Năm 2023",
          data: props.data, // Use the data prop
        },
        {
          name: "Năm 2024", // Add the second data series
          data: props.data1, // Use the data1 prop
        },
      ],
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line" // Set the chart type to 'line'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BasicLine;
