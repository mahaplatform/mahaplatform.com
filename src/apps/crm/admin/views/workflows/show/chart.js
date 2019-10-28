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
    const ctx = this.node.getContext('2d')
    const results = [{
      label: 'Enrolled',
      borderColor: '#DB2828',
      data: [
        { x: moment().subtract(5, 'months'), y: 10 },
        { x: moment().subtract(4, 'months'), y: 50 },
        { x: moment().subtract(3, 'months'), y: 85 },
        { x: moment().subtract(2, 'months'), y: 62 },
        { x: moment().subtract(1, 'months'), y: 16 }
      ]
    }, {
      label: 'Active',
      borderColor: '#F2711C',
      data: [
        { x: moment().subtract(5, 'months'), y: 10 },
        { x: moment().subtract(4, 'months'), y: 50 },
        { x: moment().subtract(3, 'months'), y: 85 },
        { x: moment().subtract(2, 'months'), y: 62 },
        { x: moment().subtract(1, 'months'), y: 16 }
      ]
    }, {
      label: 'Lost',
      borderColor: '#FBBD08',
      data: [
        { x: moment().subtract(5, 'months'), y: 10 },
        { x: moment().subtract(4, 'months'), y: 50 },
        { x: moment().subtract(3, 'months'), y: 85 },
        { x: moment().subtract(2, 'months'), y: 62 },
        { x: moment().subtract(1, 'months'), y: 16 }
      ]
    }, {
      label: 'Completed',
      borderColor: '#B5CC18',
      data: [
        { x: moment().subtract(5, 'months'), y: 10 },
        { x: moment().subtract(4, 'months'), y: 50 },
        { x: moment().subtract(3, 'months'), y: 85 },
        { x: moment().subtract(2, 'months'), y: 62 },
        { x: moment().subtract(1, 'months'), y: 16 }
      ]
    }, {
      label: 'Conversions',
      borderColor: '#21BA45',
      data: [
        { x: moment().subtract(5, 'months'), y: 5 },
        { x: moment().subtract(4, 'months'), y: 32 },
        { x: moment().subtract(3, 'months'), y: 30 },
        { x: moment().subtract(2, 'months'), y: 25 },
        { x: moment().subtract(1, 'months'), y: 10 }
      ]
    }]
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: results.map((dataset, index) => ({
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
