import React, { Component } from 'react';
import palette from '../../../../theme/palette';
import { Bar } from 'react-chartjs-2';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};

class BarView extends Component {
  constructor () {
    super();
    this.state = {
      data: []
    }
  }


  tick () {
    fetch('http://appserver:8080/api/employeeIndirectKPIs/?dept=DES-P')
    .then(results => {
      return results.json();
    }).then(data => {
      if (Array.isArray(data))
      {
        let employees = data.map(employee => employee.lmeEmployeeName);
        let weekData = data.map(employee => employee.WeekIndirectKPI);
        let monthData = data.map(employee => employee.MonthIndirectKPI);
        this.setState({
          data: {
            labels:employees,
            datasets: [
              {
                label: 'This week',
                backgroundColor: palette.primary.main,
                data: weekData
              },
              {
                label: 'This month',
                backgroundColor: palette.neutral,
                data: monthData
              }
            ]
          }
      })
      }
  }
    )
}

  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    return (
      <Bar
      data={this.state.data}
      options={options}
      />
    )
  }
}

export default BarView