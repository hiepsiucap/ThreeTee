/** @format */

import React, { Component } from "react";
import Chart from "react-apexcharts";

// Define the props interface for categories and data
interface BasicProps {
  categories: string[];
  data: number[];
}

interface ChartState {
  options: {
    chart: {
      id: string;
      fontFamily: string;
    };
    xaxis: {
      categories: string[];
    };
    plotOptions: {
      bar: {
        borderRadius: number;
        columnWidth: string;
        horizontal: boolean; // Set the bar chart to horizontal
      };
    };
    colors: string[];
  };
  series: {
    name: string;
    data: number[];
  }[];
}

class BasicBar extends Component<BasicProps, ChartState> {
  constructor(props: BasicProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          fontFamily: "Lexend, sans-serif",
        },
        xaxis: {
          categories: props.categories, // Use the categories prop
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            columnWidth: "50%",
            horizontal: true, // Set to true for horizontal bars
          },
        },
        colors: ["#28a745"], // Green color for bars
      },
      series: [
        {
          name: "series-1",
          data: props.data, // Use the data prop
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
              type="bar"
              width="700"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BasicBar;
