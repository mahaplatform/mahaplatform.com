import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const totals = [
  { label: 'Sessions', name: 'sessions_count', query: '' },
  { label: 'Active', name: 'active_count', query: '?$filter[status][$eq]=active' },
  { label: 'Lost', name: 'lost_count', query: '?$filter[status][$eq]=lost' },
  { label: 'Converted', name: 'converted_count', query: '?$filter[was_converted][$eq]=false' },
  { label: 'Completed', name: 'completed_count', query: '?$filter[status][$eq]=completed' }
]

class Performance extends React.Component {

  static propTypes = {
    campaign: PropTypes.object
  }

  render() {
    const { campaign } = this.props
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Sessions
        </div>
        <div className="crm-report-metrics">
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Sessions
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getButton(campaign.sessions_count, '') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Active
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getButton(campaign.active_count, '?$filter[status][$eq]=active') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Converted
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getButton(campaign.converted_count, '?$filter[was_converted][$eq]=true') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Conversion Rate
            </div>
            <div className="crm-report-metric-value">
              { numeral(campaign.converted_count / campaign.sessions_count).format('0.0%') }
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui table">
            <tbody>
              { totals.map((total, index) => (
                <tr key={`total_${index}`}>
                  <td>
                    { total.label }
                  </td>
                  <td className="right aligned">
                    <Button { ...this._getButton(campaign[total.name], total.query) } />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getButton(label, query) {
    const { campaign } = this.props
    return {
      label,
      className: 'link',
      route: `/admin/crm/campaigns/sms/${campaign.id}/sessions${query}`
    }
  }

}

Performance.propTypes = {
  campaign: PropTypes.object
}

export default Performance
