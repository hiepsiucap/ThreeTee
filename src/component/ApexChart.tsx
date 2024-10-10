/** @format */

import { Component } from "react";
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
        distributed: boolean;
      };
    };
    colors: string[];
    legend: { show: boolean };

    dataLabels: {
      enabled: boolean; // To control the display of data labels inside the bars
    };
  };
  series: {
    name: string;
    data: number[];
  }[];
}

class Basic extends Component<BasicProps, ChartState> {
  constructor(props: BasicProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          fontFamily: "Inter, sans-serif",
        },
        xaxis: {
          categories: props.categories, // Use the categories prop
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "50%",
            distributed: true, // Set distributed to true for different colors per column
          },
        },
        colors: ["#95A4FC", "#1C1C1C", "#A1E3CB", "#A8C5DA", "#A1E3CB"],
        legend: {
          show: false, // Hide the legend
        },
        dataLabels: {
          enabled: false, // Disable the text inside columns
        },
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Basic;
