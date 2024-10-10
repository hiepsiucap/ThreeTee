/** @format */

import { Component } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface BasicProps {
  categories: string[];
  data: number[];
}

interface ChartState {
  options: ApexOptions;
  series: number[];
}

class BasicPie extends Component<BasicProps, ChartState> {
  constructor(props: BasicProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-pie",
          fontFamily: "Inter, sans-serif",
          type: "pie", // Set the chart type to 'pie'
        },
        labels: props.categories, // Use categories as labels for the pie chart
        colors: ["#B1E3FF", "#A1E3CB", "#A8C5DA", "#292828"], // Optional: custom colors for the pie slices
        dataLabels: {
          enabled: false, // Disable the display of numbers in the pie chart
        },
      },
      series: props.data, // Pie chart only uses a single data series
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
              type="pie" // Set the chart type to 'pie'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BasicPie;
