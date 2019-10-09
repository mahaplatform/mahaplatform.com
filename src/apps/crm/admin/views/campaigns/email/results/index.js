import { Button, List, ProgressBar } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    campaign: PropTypes.object,
    results: PropTypes.object
  }

  render() {
    return (
      <div className="crm-email-campaign-results">
        <List { ...this._getList() } />
      </div>
    )
  }

  _getList() {
    const { results } = this.props
    const { sent, delivered, bounced, opened, desktop, mobile, complained, clicked, unsubscribed } = results
    return {
      sections: [
        {
          title: 'Delivery',
          items: [
            { component: (
              <div className="crm-email-campaign-results-header">
                <strong>Open Rate</strong>
                <ProgressBar color="blue" percent={ opened / delivered } />
                <ul>
                  <li>
                    Desktop <i className="fa fa-fw fa-desktop" /> { this._getPercent(desktop, opened, 'is_desktop') }
                  </li>
                  <li>
                    Mobile <i className="fa fa-fw fa-tablet" /> { this._getPercent(mobile, opened, 'is_mobile') }
                  </li>
                </ul>
              </div>
            ) },
            { component: (
              <table className="ui table">
                <tbody>
                  <tr>
                    <td>Delivered</td>
                    <td className="right aligned">
                      { this._getStat(delivered, sent, 'was_delivered') }
                    </td>
                  </tr>
                  <tr>
                    <td>Bounced</td>
                    <td className="right aligned">
                      { this._getStat(bounced, sent, 'was_bounced') }
                    </td>
                  </tr>
                  <tr>
                    <td>Opened</td>
                    <td className="right aligned">
                      { this._getStat(opened, delivered, 'was_opened') }
                    </td>
                  </tr>
                </tbody>
              </table>
            ) }
          ]
        }, {
          title: 'Performance',
          items: [
            { component: (
              <div className="crm-email-campaign-results-header">
                <strong>Click Rate</strong>
                <ProgressBar color="blue" percent={ clicked / opened } />
              </div>
            ) },
            { component: (
              <table className="ui table">
                <tbody>
                  <tr>
                    <td>Clicked</td>
                    <td className="right aligned">
                      { this._getStat(clicked, opened, 'was_clicked') }
                    </td>
                  </tr>
                  <tr>
                    <td>Complained</td>
                    <td className="right aligned">
                      { this._getStat(complained, opened, 'was_complained') }
                    </td>
                  </tr>
                  <tr>
                    <td>Unsubscribed</td>
                    <td className="right aligned">
                      { this._getStat(unsubscribed, opened, 'was_unsubscribed') }
                    </td>
                  </tr>
                </tbody>
              </table>
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
    const { campaign } = this.props
    const percent = quantity / total
    const button = {
      label: numeral(percent).format('0.0%'),
      className: 'link',
      route: `/admin/crm/campaigns/email/${campaign.code}/deliveries?$filter[${report}][$eq]=true`
    }
    return <Button { ...button } />
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

}

export default Results
