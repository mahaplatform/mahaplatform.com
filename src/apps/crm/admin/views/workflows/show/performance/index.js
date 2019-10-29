import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import Chart from './chart'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    performance: PropTypes.object,
    workflow: PropTypes.object
  }

  state = {
    scope: 'daily',
    stats: [0,1,2,3,4]
  }

  render() {
    const scopes = [
      { value: 'daily', text: 'Daily' },
      { value: 'weekly', text: 'Weekly' },
      { value: 'monthly', text: 'Monthly' },
      { value: 'yearly', text: 'Yearly' }
    ]
    const stats = [
      { label: 'Enrolled', value: 100, total: 100 },
      { label: 'Active', value: 31, total: 100 },
      { label: 'Lost', value: 20, total: 100 },
      { label: 'Completed', value: 21, total: 100 },
      { label: 'Converted', value: 28, total: 100 }
    ]
    const { performance } = this.props
    const { active, conversions, enrollments } = performance.metrics
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Enrollments
        </div>
        <div className="crm-report-header">
          <div className="crm-report-filter">
            { scopes.map((scope, index) => (
              <div className="crm-report-filter-item" key={`scope_${index}`}>
                <Button { ...this._getScope(scope) } />
              </div>
            ))}
          </div>
        </div>
        <div className="crm-report-chart">
          <Chart { ...this._getChart() } />
        </div>
        <div className="crm-report-metrics">
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Enrollments
            </div>
            <div className="crm-report-metric-value">
              { enrollments }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Active
            </div>
            <div className="crm-report-metric-value">
              { active }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Conversions
            </div>
            <div className="crm-report-metric-value">
              { conversions }
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui table">
            <tbody>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Enrolled
                </td>
                <td className="right aligned">
                  <div className="link">100</div>
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Active
                </td>
                <td className="right aligned">
                  { this._getStat(31, 100) }
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Lost
                </td>
                <td className="right aligned">
                  { this._getStat(20, 100) }
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Completed
                </td>
                <td className="right aligned">
                  { this._getStat(21, 100) }
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-check-square" /> Converted
                </td>
                <td className="right aligned">
                  { this._getStat(28, 100) }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getScope(scope) {
    return {
      label: scope.text,
      className: this.state.scope !== scope.value ? 'link' : 'text',
      handler: this._handleScope.bind(this, scope.value)
    }
  }

  _getChart() {
    const { performance } = this.props
    const { active, completed, conversions, enrolled, lost } = performance.data
    return {
      datasets: [{
        label: 'Enrolled',
        borderColor: '#DB2828',
        data: enrolled
      }, {
        label: 'Active',
        borderColor: '#F2711C',
        data: active
      }, {
        label: 'Lost',
        borderColor: '#FBBD08',
        data: lost
      }, {
        label: 'Completed',
        borderColor: '#B5CC18',
        data: completed
      }, {
        label: 'Conversions',
        borderColor: '#21BA45',
        data: conversions
      }]
    }
  }

  _getPercent(quantity, total) {
    const { workflow } = this.props
    const percent = quantity / total
    const button = {
      label: numeral(percent).format('0.0%'),
      className: 'link',
      route: `/admin/crm/workflows/${workflow.code}/enrollments`
    }
    return <Button { ...button } />
  }

  _getStat(quantity, total) {
    const percent = this._getPercent(quantity, total)
    const portion = `[${quantity} / ${total}]`
    return (
      <div>
        { percent } { portion }
      </div>
    )
  }

  _handleScope(scope) {
    this.setState({ scope })
  }

}

export default Results
