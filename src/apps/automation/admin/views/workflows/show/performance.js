import { Button, Chart } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Performance extends React.Component {

  static propTypes = {
    workflow: PropTypes.object
  }

  render() {
    const { workflow } = this.props
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Enrollments
        </div>
        <div className="crm-report-header">
          <Chart { ...this._getChart() } />
        </div>
        <div className="crm-report-metrics">
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Enrollments
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getButton(workflow.enrolled_count, '') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Active
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getButton(workflow.active_count, '?$filter[status][$eq]=active') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Converted
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getButton(workflow.converted_count, '?$filter[was_converted][$eq]=true') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Conversion Rate
            </div>
            <div className="crm-report-metric-value">
              { numeral(workflow.converted_count / workflow.enrolled_count).format('0.0%') }
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              <tr>
                <td>
                  Lost
                </td>
                <td className="right aligned">
                  <Button { ...this._getButton(workflow.lost_count, '?$filter[status][$eq]=lost') } />
                </td>
              </tr>
              <tr>
                <td>
                  Completed
                </td>
                <td className="right aligned">
                  <Button { ...this._getButton(workflow.completed_count, '?$filter[status][$eq]=completed') } />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }


  _getButton(value, query) {
    const { workflow } = this.props
    return {
      label: value,
      className: 'link',
      route: `/admin/automation/workflows/${workflow.id}/enrollments${query}`
    }
  }

  _getChart() {
    const { workflow } = this.props
    return {
      endpoint: `/api/admin/automation/workflows/${workflow.id}/performance`,
      started_at: workflow.created_at
    }
  }

}

export default Performance
