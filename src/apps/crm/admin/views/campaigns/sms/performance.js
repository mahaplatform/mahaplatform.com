import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const totals = [
  { label: 'Sessions', name: 'sessions_count', query: '' },
  { label: 'Active', name: 'active_count', query: '?$filter[was_completed][$eq]=false&$filter[unenrolled_at][$nl]' },
  { label: 'Lost', name: 'lost_count', query: '?$filter[was_completed][$eq]=false&$filter[unenrolled_at][$nl]' },
  { label: 'Converted', name: 'converted_count', query: '?$filter[was_completed][$eq]=false&$filter[unenrolled_at][$nl]' },
  { label: 'Completed', name: 'completed_count', query: '?$filter[was_completed][$eq]=false&$filter[unenrolled_at][$nl]' }
]

class Performance extends React.Component {

  render() {
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Enrollments
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
                    <Button { ...this._getButton(total.name, total.query) } />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getButton(name, query) {
    const { campaign } = this.props
    return {
      label: campaign[name],
      className: 'link',
      route: `/admin/crm/campaigns/sms/${campaign.id}/enrollments${query}`
    }
  }

}

Performance.propTypes = {
  campaign: PropTypes.object
}

export default Performance
