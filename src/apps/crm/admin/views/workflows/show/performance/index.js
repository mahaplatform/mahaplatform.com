import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Chart from './chart'
import React from 'react'
import _ from 'lodash'

class Results extends React.Component {

  static propTypes = {
    performance: PropTypes.object,
    workflow: PropTypes.object
  }

  state = {
    scope: 'daily',
    hidden: []
  }

  render() {
    const scopes = [
      { value: 'daily', text: 'Daily' },
      { value: 'weekly', text: 'Weekly' },
      { value: 'monthly', text: 'Monthly' },
      { value: 'yearly', text: 'Yearly' }
    ]
    const { performance } = this.props
    const { data, metrics, totals } = performance
    const { active, conversions, enrollments } = metrics
    const groups = [
      { label: 'Enrolled', name: 'enrolled', total: totals.enrolled, data: data.enrolled },
      { label: 'Active', name: 'active', total: totals.active, data: data.active },
      { label: 'Lost', name: 'lost', total: totals.lost, data: data.lost },
      { label: 'Completed', name: 'completed', total: totals.completed, data: data.completed },
      { label: 'Converted', name: 'converted', total: totals.converted, data: data.converted }
    ]
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
              Total Enrollments
            </div>
            <div className="crm-report-metric-value">
              { enrollments }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Active Contacts
            </div>
            <div className="crm-report-metric-value">
              { active }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Conversion Rate
            </div>
            <div className="crm-report-metric-value">
              { conversions }%
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              { groups.map((group, index) => (
                <tr key={`total_${index}`}>
                  <td>
                    <i className={`fa fa-${this._getIcon(index)}`} onClick={ this._handleToggle.bind(this, index)} />
                    { group.label }
                  </td>
                  <td className="right aligned">
                    { this._getStat(group.total, group.name) }
                  </td>
                </tr>
              ))}
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
    const { hidden } = this.state
    const { performance } = this.props
    const { data, totals } = performance
    const groups = [
      { label: 'Enrolled', name: 'enrolled', total: totals.enrolled, data: data.enrolled },
      { label: 'Active', name: 'active', total: totals.active, data: data.active },
      { label: 'Lost', name: 'lost', total: totals.lost, data: data.lost },
      { label: 'Completed', name: 'completed', total: totals.completed, data: data.completed },
      { label: 'Converted', name: 'converted', total: totals.converted, data: data.converted }
    ]
    return {
      datasets: groups.filter((group, index) => {
        return !_.includes(hidden, index)
      }).map(group => ({
        label: group.label,
        data: group.data
      }))
    }
  }

  _getIcon(index) {
    const { hidden } = this.state
    return _.includes(hidden, index) ? 'square': 'check-square'
  }

  _getStat(quantity, report) {
    const { workflow } = this.props
    const button = {
      label: quantity,
      className: 'link',
      route: `/admin/crm/workflows/${workflow.code}/enrollments?report=${report}`
    }
    return <Button { ...button } />
  }

  _handleScope(scope) {
    this.setState({ scope })
  }

  _handleToggle(index) {
    const { hidden } = this.state
    this.setState({
      hidden: _.xor(hidden, [index])
    })
  }

}

export default Results
