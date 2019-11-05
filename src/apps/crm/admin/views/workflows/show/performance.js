import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
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

const totals = [
  { label: 'Enrolled', name: 'enrolled', color: '#DB2828' },
  { label: 'Active', name: 'active', color: '#F2711C' },
  { label: 'Lost', name: 'lost', color: '#FBBD08' },
  { label: 'Completed', name: 'completed', color: '#B5CC18' },
  { label: 'Converted', name: 'converted', color: '#21BA45' }
]

const metrics = [
  { label: 'Total Enrollments', name: 'enrolled' },
  { label: 'Active Contacts', name: 'active' },
  { label: 'Conversion Rate', name: 'conversion_rate' }
]

class Performance extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    workflow: PropTypes.object
  }

  static defaultProps = {}

  chart = null
  node = null

  state = {
    hidden: [],
    performance: null,
    range: '30_days'
  }

  _handleFetch = this._handleFetch.bind(this)
  _handlePlot = this._handlePlot.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { performance } = this.state
    if(!performance) return null
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Enrollments
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
          { metrics.map((metric, index) => (
            <div className="crm-report-metric" key={`metric_${index}`}>
              <div className="crm-report-metric-title">
                { metric.label }
              </div>
              <div className="crm-report-metric-value">
                { performance.metrics[metric.name] }
              </div>
            </div>
          ))}
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              { totals.map((total, index) => (
                <tr key={`total_${index}`} onClick={ this._handleToggle.bind(this, index) }>
                  <td>
                    <i className={`fa fa-${this._getIcon(index)}`} />
                    { total.label }
                  </td>
                  <td className="right aligned">
                    <Button { ...this._getButton(total.name) } />
                  </td>
                </tr>
              ))}
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
    const { hidden, performance, range } = this.state
    if(range !== prevState.range) {
      this._handleFetch()
    }
    if(hidden !== prevState.hidden) {
      this._handlePlot()
    }
    if(!_.isEqual(performance, prevState.performance)) {
      this._handlePlot()
    }
  }

  _getButton(name, report) {
    const { performance } = this.state
    const { workflow } = this.props
    return {
      label: performance.metrics[name],
      className: 'link',
      route: `/admin/crm/workflows/${workflow.id}/enrollments?report=${report}`
    }
  }

  _getIcon(index) {
    const { hidden } = this.state
    return _.includes(hidden, index) ? 'square': 'check-square'
  }

  _getQuery() {
    const { range } = this.state
    const { workflow } = this.props
    if(range === 'ltd') {
      const start = moment(workflow.created_at)
      const end = moment()
      const step = this._getStep(start, end)
      return {
        start: start.startOf(step).format('YYYY-MM-DD'),
        end: end.add(1, step).startOf(step).format('YYYY-MM-DD'),
        step
      }
    } else if(range === 'ytd') {
      const start = moment().startOf('year')
      const end = moment()
      const step = this._getStep(start, end)
      return {
        start: start.startOf(step).format('YYYY-MM-DD'),
        end: end.add(1, step).startOf(step).format('YYYY-MM-DD'),
        step
      }
    } else if(range === '60_days') {
      return {
        start: moment().subtract(60, 'days').format('YYYY-MM-DD'),
        end: moment().add(1, 'day').format('YYYY-MM-DD'),
        step: 'day'
      }
    } else if(range === '30_days') {
      return {
        start: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        end: moment().add(1, 'day').format('YYYY-MM-DD'),
        step: 'day'
      }
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

  _handleFetch() {
    const { workflow } = this.props
    this.context.network.request({
      method: 'get',
      endpoint: `/api/admin/crm/workflows/${workflow.id}/performance`,
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
    const { hidden, performance } = this.state
    if(!this.chart) this._handleInit()
    this.chart.options.scales.xAxes[0].time.unit = step
    this.chart.data.datasets = totals.filter((total, index) => {
      return !_.includes(hidden, index)
    }).map((total, index) => ({
      label: total.label,
      data: performance.data[total.name],
      borderColor: total.color,
      pointBackgroundColor: '#FFFFFF',
      pointRadius: 3,
      pointHoverBackgroundColor: total.color,
      pointHoverRadius: 3,
      borderWidth: 2,
      fill: false
    }))
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

  _handleToggle(index) {
    const { hidden } = this.state
    this.setState({
      hidden: _.xor(hidden, [index])
    })
  }

}

export default Performance
