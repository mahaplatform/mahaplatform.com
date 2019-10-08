import { Button, List, ProgressBar } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
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
                <ProgressBar color="blue" size="large" percent={ opened / delivered } />
                <ul>
                  <li>
                    Desktop <i className="fa fa-fw fa-desktop" /> { this._getPercent(desktop, opened, 'desktop') }
                  </li>
                  <li>
                    Mobile <i className="fa fa-fw fa-tablet" /> { this._getPercent(mobile, opened, 'mobile') }
                  </li>
                </ul>
              </div>
            ) },
            { label: 'Sent', content: this._getStat(sent, sent, 'sent') },
            { label: 'Delivered', content: this._getStat(delivered, sent, 'delivered') },
            { label: 'Bounced', content: this._getStat(bounced, sent, 'bounced')  },
            { label: 'Opened', content: this._getStat(opened, delivered, 'opened') },
            { label: 'Unopened', content: this._getStat(delivered - opened, delivered, 'unopened') }
          ]
        }
      ]
    }
  }

  _getPerformance() {
    const { results } = this.props
    const { delivered, opened, complained, clicked, unsubscribed } = results
    return {
      sections: [
        {
          title: 'Performance',
          items: [
            { component: (
              <div className="crm-email-campaign-results-header">
                <strong>Click Rate</strong>
                <ProgressBar color="blue" size="large" percent={ clicked / opened } />
              </div>
            ) },
            { label: 'Clicked', content: this._getStat(clicked, opened, 'clicked') },
            { label: 'Compained', content: this._getStat(complained, delivered, 'complained') },
            { label: 'Unsubscribed', content: this._getStat(unsubscribed, opened, 'unsubscribed') }
          ]
        }
      ]
    }
  }

  _getPercent(quantity, total, report) {
    const percent = quantity / total
    const format = percent % 100 > 0 ? '0.0%' : '0%'
    if(quantity === 0) return '0%'
    const button = {
      label: numeral(percent).format(format),
      className: 'link',
      route: `/admin/crm/campaigns/email/1234/${report}`
    }
    return <Button { ...button } />
  }

  _getStat(quantity, total, report) {
    const percent = this._getPercent(quantity, total)
    const portion = `[${quantity} / ${total}]`
    return (
      <div>
        { percent } { portion }
      </div>
    )
  }

}

export default Results
