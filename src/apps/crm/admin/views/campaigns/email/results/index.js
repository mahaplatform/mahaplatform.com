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
      <div>
        <List { ...this._getDelivery() } />
        <List { ...this._getPerformance() } />
      </div>
    )
  }

  _getDelivery() {
    const { results } = this.props
    const { sent, delivered, bounced, opened, desktop, mobile } = results
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
            { label: 'Delivered', content: this._getStat(delivered, sent, 'was_delivered') },
            { label: 'Bounced', content: this._getStat(bounced, sent, 'was_bounced')  },
            { label: 'Opened', content: this._getStat(opened, delivered, 'was_opened') }
          ]
        }
      ]
    }
  }

  _getPerformance() {
    const { results } = this.props
    const { opened, complained, clicked, unsubscribed } = results
    return {
      sections: [
        {
          title: 'Performance',
          items: [
            { component: (
              <div className="crm-email-campaign-results-header">
                <strong>Click Rate</strong>
                <ProgressBar color="blue" percent={ clicked / opened } />
              </div>
            ) },
            { label: 'Clicked', content: this._getStat(clicked, opened, 'was_clicked') },
            { label: 'Compained', content: this._getStat(complained, opened, 'was_complained') },
            { label: 'Unsubscribed', content: this._getStat(unsubscribed, opened, 'was_unsubscribed') }
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
