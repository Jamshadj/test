import React, { Component } from "react";
import Chart from "react-apexcharts";

class RevenueCharts extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    const months = Array.from({ length: 12 }, (_, index) => {
      const month = new Date(currentDate.getFullYear(), index);
      return month.toLocaleString('default', { month: 'long' });
    });

    const monthlyRevenueData = new Array(12).fill(0);
    this.props.bookings.forEach((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      const monthIndex = bookingDate.getMonth();
      monthlyRevenueData[monthIndex] += booking.totalAmount;
    });

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: months
        }
      },
      series: [
        {
          name: "Revenue",
          data: monthlyRevenueData
        }
      ]
    };
  }

  render() {
    return (
      <div className="app mt-6">
        <div className="row">
          <div className="mixed-chart w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
            {/* 
              The "w-full" class ensures that the chart takes up the full width on all screen sizes.
              The responsive width classes like "sm:w-2/3", "md:w-1/2", etc., adjust the width on different screen sizes.
              The "mx-auto" class centers the chart horizontally within its container.
            */}
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="100%" // Make sure the chart takes up the full width of its container
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RevenueCharts;
