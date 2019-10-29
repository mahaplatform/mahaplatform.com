import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'
import 'chartjs-plugin-annotation'
import moment from 'moment'

class LineChart extends Component {

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
    this.createBarChart()
  }

  createBarChart() {
    const { datasets } = this.props
    const ctx = this.node.getContext('2d')
    new Chart(ctx, {
      animation: false,
      type: 'line',
      data: {
        datasets: datasets.map((dataset, index) => ({
          ...dataset,
          borderWidth: 2,
          fill: false
        }))
      },
      options: {
        legend: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                minute: 'mm/dd/yyyy'
              }
            },
            display: true,
            gridLines: {
              display: false
            }
          }]
        },
        elements: {
          line: {
            tension: 0
          }
        }
      }
    })
  }

}

export default LineChart
