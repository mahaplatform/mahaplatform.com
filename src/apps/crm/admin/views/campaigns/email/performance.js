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
    const { sent, delivered, bounced, opened, desktop, mobile, complained, clicked, unsubscribed } = performance
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
                          { numeral(opened / delivered).format('0.00%') }
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
                          { numeral(clicked / delivered).format('0.00%') }
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
                      { this._getButton(opened, 'opened') }
                    </div>
                  </div>
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Clicked</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(clicked, 'clicked') }
                    </div>
                  </div>
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Bounced</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(bounced, 'bounced') }
                    </div>
                  </div>
                  <div className="crm-report-metric">
                    <div className="crm-report-metric-title">Unsubscribed</div>
                    <div className="crm-report-metric-value">
                      { this._getButton(unsubscribed, 'unsubscribed') }
                    </div>
                  </div>
                </div>
                <div className="crm-report-table">
                  <table className="ui table">
                    <tbody>
                      <tr>
                        <td>Sent</td>
                        <td className="right aligned">
                          { this._getButton(sent, 'sent') }
                        </td>
                      </tr>
                      <tr>
                        <td>Deliveried</td>
                        <td className="right aligned">
                          { this._getButton(delivered, 'delivered') }
                        </td>
                      </tr>
                      <tr>
                        <td>Bounced</td>
                        <td className="right aligned">
                          { this._getButton(bounced, 'bounced') }
                        </td>
                      </tr>
                      <tr>
                        <td>Total Opens</td>
                        <td className="right aligned">
                          { this._getButton(opened, 'opened') }
                        </td>
                      </tr>
                      <tr>
                        <td>Total Clicks</td>
                        <td className="right aligned">
                          { this._getButton(clicked, 'clicked') }
                        </td>
                      </tr>
                      <tr>
                        <td>Clicked</td>
                        <td className="right aligned">
                          { this._getButton(clicked, 'clicked') }
                        </td>
                      </tr>
                      <tr>
                        <td>Viewed Online</td>
                        <td className="right aligned">
                          { this._getButton(clicked, 'clicked') }
                        </td>
                      </tr>
                      <tr>
                        <td>Forwarded</td>
                        <td className="right aligned">
                          { this._getButton(clicked, 'clicked') }
                        </td>
                      </tr>
                      <tr>
                        <td>Complained</td>
                        <td className="right aligned">
                          { this._getButton(complained, 'was_complained') }
                        </td>
                      </tr>
                      <tr>
                        <td>Unsubscribed</td>
                        <td className="right aligned">
                          { this._getButton(unsubscribed, 'was_unsubscribed') }
                        </td>
                      </tr>
                      <tr>
                        <td>Desktop</td>
                        <td className="right aligned">
                          { this._getPercent(desktop, opened, 'is_desktop') }
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile</td>
                        <td className="right aligned">
                          { this._getPercent(mobile, opened, 'is_mobile') }
                        </td>
                      </tr>
                      <tr>
                        <td>Last Opened</td>
                        <td className="right aligned">
                          { moment().format('MM/DD/YY hh:mmA') }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) }
          ]
        }, {
          title: 'Links',
          items: [
            { component: (
              <table className="ui table">
                <tbody>
                  <tr>
                    <td>
                      <a href="http://www.ccetompkins.org/baz/bar/foo" target="_blank">
                        http://www.ccetompkins.org/baz/bar/foo
                      </a>
                    </td>
                    <td className="right aligned">
                      { this._getStat(unsubscribed, opened, 'was_unsubscribed') }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="http://www.ccetompkins.org/baz/bar/foo" target="_blank">
                        http://www.ccetompkins.org/baz/bar/foo
                      </a>
                    </td>
                    <td className="right aligned">
                      { this._getStat(unsubscribed, opened, 'was_unsubscribed') }
                    </td>
                  </tr>
                </tbody>
              </table>
            ) }
          ]
        }
      ]
    }
  }

  _getPercent(quantity, total, report) {
    const percent = quantity / total
    return this._getButton(numeral(percent).format('0.0%'), report)
  }

  _getStat(quantity, total, report) {
    const percent = this._getPercent(quantity, total, report)
    const portion = `[${quantity} / ${total}]`
    return (
      <div>
        { percent } { portion }
      </div>
    )
  }

  _getButton(value, report) {
    const { campaign } = this.props
    const button = {
      label: value,
      className: 'link',
      route: `/admin/crm/campaigns/email/${campaign.code}/deliveries?$filter[${report}][$eq]=true`
    }
    return <Button { ...button } />
  }

}

export default Performance
