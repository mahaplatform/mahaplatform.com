import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
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

class Performance extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    form: PropTypes.object
  }

  static defaultProps = {}

  chart = null
  node = null

  state = {
    performance: null,
    range: '30_days'
  }

  _handleFetch = this._handleFetch.bind(this)
  _handlePlot = this._handlePlot.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { performance } = this.state
    if(!performance) return null
    const { respondants, responses, unknown_respondants } = performance.metrics
    const { known_respondants, revenue, average_duration } = performance.metrics
    const { first_response, last_response } = performance.metrics
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Responses
        </div>
        <div className="crm-report-header">
          <div className="crm-report-filter">
            { ranges.map((range, index) => (
              <div className="crm-report-filter-item" key={`range_${index}`}>
                <Button { ...this._getRange(range) } />
              </div>
            ))}
          </div>
        </div>
        <div className="crm-report-chart">
          <canvas ref={ node => this.node = node } className="monitor-chart" />
        </div>
        <div className="crm-report-metrics">
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Respondants
            </div>
            <div className="crm-report-metric-value">
              { respondants }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Responses
            </div>
            <div className="crm-report-metric-value">
              { responses }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Revenue
            </div>
            <div className="crm-report-metric-value">
              { numeral(revenue).format('0.00') }
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              <tr>
                <td>Unknown Respondants</td>
                <td className="right aligned">
                  { unknown_respondants }
                </td>
              </tr>
              <tr>
                <td>Known Respondants</td>
                <td className="right aligned">
                  { known_respondants }
                </td>
              </tr>
              <tr>
                <td>Average Duration</td>
                <td className="right aligned">
                  { average_duration } seconds
                </td>
              </tr>
              <tr>
                <td>First Response</td>
                <td className="right aligned">
                  { first_response ? moment(first_response).format('MM/DD/YY hh:mmA') : 'N/A' }
                </td>
              </tr>
              <tr>
                <td>Last Response</td>
                <td className="right aligned">
                  { last_response ? moment(last_response).format('MM/DD/YY hh:mmA') : 'N/A' }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch()
  }

  componentDidUpdate(prevProps, prevState) {
    const { performance, range } = this.state
    if(range !== prevState.range) {
      this._handleFetch()
    }
    if(!_.isEqual(performance, prevState.performance)) {
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
    const { range } = this.state
    const { form } = this.props
    const tz = moment().tz(moment.tz.guess()).format('z')
    if(range === 'ltd') {
      const start = moment(form.created_at)
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

  _getStat(quantity) {
    const { form } = this.props
    const button = {
      label: quantity,
      className: 'link',
      route: `/admin/crm/forms/${form.id}/responses`
    }
    return <Button { ...button } />
  }

  _handleFetch() {
    const { form } = this.props
    this.context.network.request({
      method: 'get',
      endpoint: `/api/admin/crm/forms/${form.id}/performance`,
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
            }
          }]
        }
      }
    })
  }

  _handlePlot() {
    const { step } = this._getQuery()
    const { performance } = this.state
    if(!this.chart) this._handleInit()
    this.chart.options.scales.xAxes[0].time.unit = step
    this.chart.data.datasets = [{
      label: 'Responses',
      data: performance.data.responses,
      borderColor: '#DB2828',
      pointBackgroundColor: '#FFFFFF',
      pointRadius: 3,
      pointHoverBackgroundColor: '#DB2828',
      pointHoverRadius: 3,
      borderWidth: 2,
      fill: false
    }]
    this.chart.update()
  }

  _handleRange(range) {
    this.setState({ range })
  }

  _handleSuccess(result) {
    this.setState({
      performance: result.data
    })
  }

}

export default Performance
