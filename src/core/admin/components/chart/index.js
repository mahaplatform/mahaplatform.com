import PropTypes from 'prop-types'
import Button from '../button'
import Chart from 'chart.js'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

const ranges = [
  { value: '30_days', text: 'Last 30 days' },
  { value: '60_days', text: 'Last 60 days' },
  { value: 'ytd', text: 'Year to Date' },
  { value: 'ltd', text: 'Life to Date' }
]

class ChartWrapper extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    endpoint: PropTypes.string,
    started_at: PropTypes.any
  }

  chart = null
  node = null

  state = {
    data: null,
    range: '30_days'
  }

  _handleFetch = this._handleFetch.bind(this)
  _handlePlot = this._handlePlot.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { data } = this.state
    if(!data) return null
    return (
      <div className="maha-chart">
        <div className="maha-chart-header">
          { ranges.map((range, index) => (
            <div className="maha-chart-range" key={`range_${index}`}>
              <Button { ...this._getRange(range) } />
            </div>
          ))}
        </div>
        <div className="maha-chart-body">
          <canvas ref={ node => this.node = node } width="756" height="250" />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch()
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, range } = this.state
    if(range !== prevState.range) {
      this._handleFetch()
    }
    if(!_.isEqual(data, prevState.data)) {
      this._handlePlot()
    }
  }

  _getRange(range) {
    return {
      label: range.text,
      className: this.state.range !== range.value ? 'link' : 'text',
      handler: this._handleRange.bind(this, range.value)
    }
  }

  _getStep(start, end) {
    const diff = end.diff(start, 'days')
    if(diff <= 60) return 'day'
    return 'month'
  }

  _getQuery() {
    const { started_at } = this.props
    const { range } = this.state
    const tz = moment().tz(moment.tz.guess()).format('z')
    if(range === 'ltd') {
      const start = moment(started_at)
      const end = moment()
      const step = this._getStep(start, end)
      return {
        start: start.startOf(step).format('YYYY-MM-DD'),
        end: end.add(1, step).startOf(step).format('YYYY-MM-DD'),
        step,
        tz
      }
    } else if(range === 'ytd') {
      const start = moment().startOf('year')
      const end = moment()
      const step = this._getStep(start, end)
      return {
        start: start.startOf(step).format('YYYY-MM-DD'),
        end: end.add(1, step).startOf(step).format('YYYY-MM-DD'),
        step,
        tz
      }
    } else if(range === '60_days') {
      return {
        start: moment().subtract(60, 'days').format('YYYY-MM-DD'),
        end: moment().add(1, 'day').format('YYYY-MM-DD'),
        step: 'day',
        tz
      }
    } else if(range === '30_days') {
      return {
        start: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        end: moment().add(1, 'day').format('YYYY-MM-DD'),
        step: 'day',
        tz
      }
    }
  }

  _handleFetch() {
    const { endpoint } = this.props
    this.context.network.request({
      method: 'get',
      endpoint,
      query: this._getQuery(),
      onSuccess: this._handleSuccess
    })
  }

  _handleInit() {
    const { step } = this._getQuery()
    this.chart = new Chart(this.node.getContext('2d'), {
      type: 'line',
      options: {
        animation: {
          duration: 0
        },
        elements: {
          line: {
            tension: 0
          }
        },
        legend: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: step,
              tooltipFormat: 'MM/DD/YYYY',
              displayFormats: {
                day: 'MM/DD/YY',
                week: 'MM/YY'
              }
            },
            display: true,
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              stepSize: 1
            },
            gridLines: {
              display: false
            }
          }]
        }
      }
    })
  }

  _handlePlot() {
    const { step } = this._getQuery()
    const { data } = this.state
    if(!this.chart) this._handleInit()
    this.chart.options.scales.xAxes[0].time.unit = step
    this.chart.data.datasets = [{
      label: 'Responses',
      data,
      borderColor: '#DB2828',
      pointBackgroundColor: '#FFFFFF',
      pointRadius: 4,
      pointHoverBackgroundColor: '#DB2828',
      pointHoverRadius: 4,
      borderWidth: 3,
      fill: false
    }]
    this.chart.update()
  }

  _handleRange(range) {
    this.setState({ range })
  }

  _handleSuccess(result) {
    this.setState({
      data: result.data
    })
  }

}

export default ChartWrapper
