import PropTypes from 'prop-types'
import React from 'react'

class Subscription extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    if(!activity.data) return null
    const { actions } = activity.data
    return (
      <div className="crm-timeline-item-card-subscription">
        <ul>
          { actions.map((item, index) => (
            <li key={`item_${index}`}>
              { item.action === 'unconsented' &&
                <span>unsubscribed from all { item.program } mailings</span>
              }
              { item.action === 'subscribed' &&
                <span>subscribed to { item.program } - { item.list }</span>
              }
              { item.action === 'resubscribed' &&
                <span>resubscribed to { item.program } - { item.list }</span>
              }
              { item.action === 'unsubscribed' &&
                <span>unsubscribed from { item.program } - { item.list }</span>
              }
            </li>
          )) }
        </ul>
      </div>
    )
  }

}

export default Subscription
