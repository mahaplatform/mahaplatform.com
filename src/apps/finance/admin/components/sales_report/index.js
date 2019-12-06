import moment from 'moment-timezone'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import Chart from 'chart.js'
import React from 'react'
import _ from 'lodash'
import qs from 'qs'

const ranges = [
  { value: '30_days', text: 'Last 30 days' },
  { value: 'ytd', text: 'Year to Date' },
  { value: 'ltd', text: 'Life to Date' }
]

const totals = [
  { label: 'Revenue', name: 'revenue', color: '#DB2828' }
]

const metrics = [
  { label: 'Total Revenue', name: 'revenue', format: (value) => numeral(value).format('$0') },
  { label: 'Average Amount', name: 'average', format: (value) => numeral(value).format('$0') },
  { label: 'Transactions', name: 'transactions' }
]

class SalesReport extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    start: PropTypes.object
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
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Sales
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
                { metric.format ? metric.format(performance.metrics[metric.name]) : performance.metrics[metric.name] }
              </div>
            </div>
          ))}
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              { performance.data.revenue.filter(revenue => {
                return revenue.y > 0
              }).map((revenue, index) => (
                <tr key={`total_${index}`}>
                  <td>
                    { moment(revenue.x).format('MM/DD/YYYY') }
                  </td>
                  <td className="right aligned">
                    <Button { ...this._getButton(revenue.y, revenue.x) } />
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
    const { performance, range } = this.state
    if(range !== prevState.range) {
      this._handleFetch()
    }
    if(!_.isEqual(performance, prevState.performance)) {
      this._handlePlot()
    }
  }

  _getButton(total, date) {
    const { filter } = this.props
    const query = qs.stringify({
      $filter: {
        ...filter,
        date: {
          $eq: moment(date).format('YYYY-MM-DD')
        }
      }
    }, { encode: false, skipNulls: true })
    return {
      label: numeral(total).format('$0.00'),
      className: 'link',
      route: `/admin/finance/payments?${query}`
    }
  }

  _getQuery() {
    const { range } = this.state
    const tz = moment().tz(moment.tz.guess()).format('z')
    if(range === 'ltd') {
      const start = moment(this.props.start)
      const end = moment()
      const step = this._getStep(start, end)
      return {
        start: start.startOf(step).format('YYYY-MM-DD'),
        end: end.startOf(step).format('YYYY-MM-DD'),
        step,
        tz
      }
    } else if(range === 'ytd') {
      const start = moment().startOf('year')
      const end = moment()
      const step = this._getStep(start, end)
      return {
        start: start.startOf(step).format('YYYY-MM-DD'),
        end: end.startOf(step).format('YYYY-MM-DD'),
        step,
        tz
      }
    } else if(range === '30_days') {
      return {
        start: moment().subtract(29, 'days').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
        step: 'day',
        tz
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
        layout: {
          padding: {
            right: 15
          }
        },
        legend: false,
        scales: {
          xAxes: [{
            type: 'time',
            ticks: {
              fontColor: '#CCC'
            },
            time: {
              distribution: 'series',
              stepSize: 2,
              unit: step,
              tooltipFormat: 'MM/DD',
              displayFormats: {
                day: 'MM/DD',
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
              display: false,
              callback: (value) => `$${value}`
            },
            gridLines: {
              display: false
            }
          }]
        // },
        // tooltips: {
          // enabled: false,
          // custom: function(tooltipModel) {
          //   var tooltipEl = document.getElementById('chartjs-tooltip')
          //   if (!tooltipEl) {
          //     tooltipEl = document.createElement('div')
          //     tooltipEl.id = 'chartjs-tooltip'
          //     tooltipEl.innerHTML = '<table></table>'
          //     document.body.appendChild(tooltipEl)
          //   }
          //   if(tooltipModel.opacity === 0) return tooltipEl.style.opacity = 0
          //   tooltipEl.classList.remove('above', 'below', 'no-transform')
          //   if (tooltipModel.yAlign) {
          //     tooltipEl.classList.add(tooltipModel.yAlign)
          //   } else {
          //     tooltipEl.classList.add('no-transform')
          //   }
          //   const getBody = (bodyItem) => bodyItem.lines
          //   if (tooltipModel.body) {
          //     var titleLines = tooltipModel.title || []
          //     var bodyLines = tooltipModel.body.map(getBody)
          //     var innerHtml = '<thead>'
          //     titleLines.forEach(function(title) {
          //       innerHtml += '<tr><th>' + title + '</th></tr>'
          //     })
          //     innerHtml += '</thead><tbody>'
          //     bodyLines.forEach(function(body, i) {
          //       var colors = tooltipModel.labelColors[i]
          //       var style = 'background:' + colors.backgroundColor
          //       style += ' border-color:' + colors.borderColor
          //       style += ' border-width: 2px'
          //       var span = '<span style="' + style + '"></span>'
          //       innerHtml += '<tr><td>' + span + body + '</td></tr>'
          //     })
          //     innerHtml += '</tbody>'
          //
          //     var tableRoot = tooltipEl.querySelector('table')
          //     tableRoot.innerHTML = innerHtml
          //   }
          //   var position = this._chart.canvas.getBoundingClientRect()
          //   tooltipEl.style.opacity = 1
          //   tooltipEl.style.position = 'absolute'
          //   tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px'
          //   tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px'
          //   tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
          //   tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px'
          //   tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
          //   tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px'
          //   tooltipEl.style.pointerEvents = 'none'
          // }
        }
      }
    })
  }

  _handlePlot() {
    const { step } = this._getQuery()
    const { performance } = this.state
    if(!this.chart) this._handleInit()
    const min = Object.keys(performance.data).reduce((min, key) => {
      return Math.min(performance.data[key].reduce((min, point) => {
        return Math.min(point.y, min)
      }, 0), min)
    }, 0)
    const max = Object.keys(performance.data).reduce((max, key) => {
      return Math.max(performance.data[key].reduce((max, point) => {
        return Math.max(point.y, max)
      }, 0), max)
    }, 0)
    const margin = Math.ceil((max - min) / 25)
    this.chart.options.scales.xAxes[0].time.unit = step
    this.chart.options.scales.yAxes[0].ticks.min = min - margin
    this.chart.options.scales.yAxes[0].ticks.max = max + margin
    this.chart.data.datasets = totals.map((total, index) => ({
      label: total.label,
      data: performance.data[total.name],
      borderColor: total.color,
      pointBackgroundColor: '#FFFFFF',
      pointRadius: 4,
      pointHoverBackgroundColor: total.color,
      pointHoverRadius: 5,
      borderWidth: 3,
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

}

export default SalesReport
