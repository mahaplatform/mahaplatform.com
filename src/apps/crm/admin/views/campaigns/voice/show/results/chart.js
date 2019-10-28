import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'
import 'chartjs-plugin-annotation'

class BarChart extends Component {

  static propTypes = {
    datasets: PropTypes.array,
    threshold: PropTypes.number,
    title: PropTypes.string,
    yAxes: PropTypes.object
  }

  static defaultProps = {
    annotation: {}
  }

  node = null

  createBarChart = this.createBarChart.bind(this)

  render() {
    return <canvas ref={ node => this.node = node } className="monitor-chart" />
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    // this.createBarChart()
  }

  createBarChart() {
    const ctx = this.node.getContext('2d')
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor:  'rgba(54, 162, 235, 0.2)',
          borderColor:'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

}

export default BarChart
