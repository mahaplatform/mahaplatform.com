import { Button, List, ProgressBar } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

class Performance extends React.Component {

  static propTypes = {
    campaign: PropTypes.object,
    performance: PropTypes.object
  }

  render() {
    return (
      <div className="crm-email-campaign-results">
        <List { ...this._getList() } />
      </div>
    )
  }

  _getList() {
    const { performance } = this.props
    const { sent, delivered, bounced, opened, total_opened, desktop } = performance
    const { mobile, webviewed, shared, forwarded, complained } = performance
    const { clicked, total_clicked, unsubscribed, last_opened_at } = performance
    return {
      sections: [
        {
          items: [
            { component: (
              <div className="crm-report">
                <div className="crm-report-title">Delivery</div>
                <div className="crm-report-table">
                  <div className="crm-email-campaign-results-header">
                    <div className="crm-email-campaign-results-header-item">
                      <div className="crm-email-campaign-results-stat">
                        <div className="crm-email-campaign-results-stat-title">
                          Open Rate
                        </div>
                        <div className="crm-email-campaign-results-stat-percent">
                          { numeral(opened / delivered).format('0.0%') }
                        </div>
                      </div>
                      <ProgressBar labeled={ false } color="blue" percent={ delivered > 0 ? (opened / delivered) : 0 } />
                    </div>
                    <div className="crm-email-campaign-results-header-item">
                      <div className="crm-email-campaign-results-stat">
                        <div className="crm-email-campaign-results-stat-title">
                          Click Rate
                        </div>
                        <div className="crm-email-campaign-results-stat-percent">
                          { numeral(clicked / opened).format('0.0%') }
                        </div>
                      </div>
                      <ProgressBar labeled={ false } color="blue" percent={ opened > 0 ? (clicked / opened) : 0 } />
                    </div>
                  </div>
                </div>
                <div className="crm-report-metrics">
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Opened</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(opened, 'was_opened') }
                    </div>
                  </div>
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Clicked</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(clicked, 'was_clicked') }
                    </div>
                  </div>
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Bounced</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(bounced, 'was_bounced') }
                    </div>
                  </div>
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Unsubscribed</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(unsubscribed, 'was_unsubscribed') }
                    </div>
                  </div>
                </div>
                <div className="crm-report-table">
                  <table className="ui unstackable table">
                    <tbody>
                      <tr>
                        <td>Sent</td>
                        <td className="right aligned">
                          { this._getButton(sent) }
                        </td>
                      </tr>
                      <tr>
                        <td>Delivered</td>
                        <td className="right aligned">
                          { this._getButton(delivered, 'was_delivered') }
                        </td>
                      </tr>
                      <tr>
                        <td>Total Opened</td>
                        <td className="right aligned">
                          { this._getActivity(total_opened, 'open') }
                        </td>
                      </tr>
                      <tr>
                        <td>Total Clicked</td>
                        <td className="right aligned">
                          { this._getActivity(total_clicked, 'click') }
                        </td>
                      </tr>
                      <tr>
                        <td>Viewed Online</td>
                        <td className="right aligned">
                          { this._getActivity(webviewed, 'webview') }
                        </td>
                      </tr>
                      <tr>
                        <td>Forwarded</td>
                        <td className="right aligned">
                          { this._getActivity(forwarded, 'forward') }
                        </td>
                      </tr>
                      <tr>
                        <td>Shared</td>
                        <td className="right aligned">
                          { this._getActivity(shared, 'share') }
                        </td>
                      </tr>
                      <tr>
                        <td>Complained</td>
                        <td className="right aligned">
                          { this._getButton(complained, 'was_complained') }
                        </td>
                      </tr>
                      <tr>
                        <td>Desktop</td>
                        <td className="right aligned">
                          { this._getDevice(desktop, total_opened, false) }
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile</td>
                        <td className="right aligned">
                          { this._getDevice(mobile, total_opened, true) }
                        </td>
                      </tr>
                      <tr>
                        <td>Last Opened</td>
                        <td className="right aligned">
                          { last_opened_at ? moment(last_opened_at).format('MM/DD/YY hh:mmA') : 'N/A' }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) }
          ]
        }
      ]
    }
  }

  _getDevice(quantity, total, is_mobile) {
    const { campaign } = this.props
    const percent = total > 0 ? numeral(quantity / total).format('0.0%') : '0%'
    const button = {
      label: percent,
      className: 'link',
      route: `/admin/crm/campaigns/email/${campaign.id}/activities?$filter[$and][0][type][$eq]=open&$filter[$and][1][is_mobile][$eq]=${is_mobile}`
    }
    return <Button { ...button } />

  }

  _getActivity(value, type) {
    const { campaign } = this.props
    const button = {
      label: value,
      className: 'link',
      route: `/admin/crm/campaigns/email/${campaign.id}/activities?$filter[$and][0][type][$eq]=${type}`
    }
    return <Button { ...button } />
  }

  _getButton(value, report) {
    const { campaign } = this.props
    const query = report ? `?$filter[${report}][$eq]=true` : ''
    const button = {
      label: value,
      className: 'link',
      route: `/admin/crm/campaigns/email/${campaign.id}/deliveries${query}`
    }
    return <Button { ...button } />
  }

}

export default Performance
