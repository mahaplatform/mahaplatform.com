import { Button, List, ProgressBar } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'
import qs from 'qs'

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
    const { open_rate, click_rate, bounce_rate } = performance
    const { hard_bounced, soft_bounced } = performance
    return {
      sections: [
        {
          items: [
            { component: (
              <div className="crm-report">
                <div className="crm-report-table">
                  <div className="crm-email-campaign-results-header">
                    <div className="crm-email-campaign-results-header-item">
                      <div className="crm-email-campaign-results-stat">
                        <div className="crm-email-campaign-results-stat-title">
                          Open Rate
                        </div>
                        <div className="crm-email-campaign-results-stat-percent">
                          { numeral(open_rate).format('0.0%') }
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
                          { numeral(click_rate).format('0.0%') }
                        </div>
                      </div>
                      <ProgressBar labeled={ false } color="blue" percent={ opened > 0 ? (clicked / opened) : 0 } />
                    </div>
                    <div className="crm-email-campaign-results-header-item">
                      <div className="crm-email-campaign-results-stat">
                        <div className="crm-email-campaign-results-stat-title">
                          Bounce Rate
                        </div>
                        <div className="crm-email-campaign-results-stat-percent">
                          { numeral(bounce_rate).format('0.0%') }
                        </div>
                      </div>
                      <ProgressBar labeled={ false } color="blue" percent={ bounced > 0 ? (bounced / sent) : 0 } />
                    </div>
                  </div>
                </div>
                <div className="crm-report-metrics">
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Opens</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(opened, { was_opened: { $eq: true } }) }
                    </div>
                  </div>
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Clicks</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(clicked, { was_clicked: { $eq: true } }) }
                    </div>
                  </div>
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Bounces</div>
                    <div className="crm-report-metric-value">
                      { this._getBounces(bounced) }
                    </div>
                  </div>
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Unsubscribes</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(unsubscribed, { was_unsubscribed: { $eq: true } }) }
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
                          { this._getButton(delivered, { was_delivered: { $eq: true } }) }
                        </td>
                      </tr>
                      <tr>
                        <td>Not Opened</td>
                        <td className="right aligned">
                          { this._getButton(delivered - opened, [{ was_delivered: { $eq: true } }, { was_opened: { $eq: false } }]) }
                        </td>
                      </tr>
                      <tr>
                        <td>Total Opens</td>
                        <td className="right aligned">
                          { this._getActivity(total_opened, 'open') }
                        </td>
                      </tr>
                      <tr>
                        <td>Total Clicks</td>
                        <td className="right aligned">
                          { this._getActivity(total_clicked, 'click') }
                        </td>
                      </tr>
                      <tr>
                        <td>Views Online</td>
                        <td className="right aligned">
                          { this._getActivity(webviewed, 'webview') }
                        </td>
                      </tr>
                      <tr>
                        <td>Forwards</td>
                        <td className="right aligned">
                          { this._getActivity(forwarded, 'forward') }
                        </td>
                      </tr>
                      <tr>
                        <td>Shares</td>
                        <td className="right aligned">
                          { this._getActivity(shared, 'share') }
                        </td>
                      </tr>
                      <tr>
                        <td>Hard Bounces</td>
                        <td className="right aligned">
                          { this._getBounces(hard_bounced, 'Permanent') }
                        </td>
                      </tr>
                      <tr>
                        <td>Soft Bounces</td>
                        <td className="right aligned">
                          { this._getBounces(soft_bounced, 'Transient') }
                        </td>
                      </tr>
                      <tr>
                        <td>Complaints</td>
                        <td className="right aligned">
                          { this._getButton(complained, { was_complained: { $eq: true } }) }
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
                        <td>Last Open</td>
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
      route: `/admin/campaigns/email/${campaign.id}/activities?$filter[$and][0][type][$eq]=open&$filter[$and][1][is_mobile][$eq]=${is_mobile}`
    }
    return <Button { ...button } />

  }

  _getActivity(value, type) {
    const { campaign } = this.props
    const button = {
      label: value,
      className: 'link',
      route: `/admin/campaigns/email/${campaign.id}/activities?$filter[$and][0][type][$eq]=${type}`
    }
    return <Button { ...button } />
  }

  _getButton(value, $filter) {
    const { campaign } = this.props
    const query = $filter ? `?${qs.stringify({ $filter }, { encode: false })}` : ''
    const button = {
      label: value,
      className: 'link',
      route: `/admin/campaigns/email/${campaign.id}/deliveries${query}`
    }
    return <Button { ...button } />
  }

  _getBounces(value, type) {
    const { campaign } = this.props
    const query = type ? `?$filter[bounce_type][$eq]=${type}` : ''
    const button = {
      label: value,
      className: 'link',
      route: `/admin/campaigns/email/${campaign.id}/bounces${query}`
    }
    return <Button { ...button } />
  }

}

export default Performance
