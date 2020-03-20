import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Performance extends React.Component {

  static propTypes = {
    campaign: PropTypes.object
  }

  render() {
    const { campaign } = this.props
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Calls
        </div>
        <div className="crm-report-metrics">
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Calls
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getCallsButton(campaign.calls_count, '') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Active
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getCallsButton(campaign.active_count, '?$filter[status][$eq]=active') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Converted
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getCallsButton(campaign.converted_count, '?$filter[was_converted][$eq]=true') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Conversion Rate
            </div>
            <div className="crm-report-metric-value">
              { numeral(campaign.converted_count / campaign.calls_count).format('0.0%') }
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui table">
            <tbody>
              <tr>
                <td>
                  Lost
                </td>
                <td className="right aligned">
                  <Button { ...this._getCallsButton(campaign.lost_count, '?$filter[status][$eq]=lost') } />
                </td>
              </tr>
              <tr>
                <td>
                  Hangups
                </td>
                <td className="right aligned">
                  <Button { ...this._getCallsButton(campaign.hangups_count, '?$filter[status][$eq]=lost') } />
                </td>
              </tr>
              <tr>
                <td>
                  Answering Machines
                </td>
                <td className="right aligned">
                  <Button { ...this._getCallsButton(campaign.answering_machines_count, '') } />
                </td>
              </tr>
              <tr>
                <td>
                  Recordings
                </td>
                <td className="right aligned">
                  <Button { ...this._getRecordingsButton(campaign.recordings_count) } />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getCallsButton(label, query) {
    const { campaign } = this.props
    return {
      label,
      className: 'link',
      route: `/admin/crm/campaigns/voice/${campaign.id}/calls${query}`
    }
  }

  _getRecordingsButton(label) {
    const { campaign } = this.props
    return {
      label,
      className: 'link',
      route: `/admin/crm/campaigns/voice/${campaign.id}/recordings`
    }
  }

}

Performance.propTypes = {
  campaign: PropTypes.object
}

export default Performance
