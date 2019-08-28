import PropTypes from 'prop-types'
import React from 'react'

class Preferences extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    if(!activity.data) return null
    const { program, email_address, actions } = activity.data
    return (
      <div className="crm-timeline-item-card-subscription">
        <strong>Email:</strong> { email_address.address }<br />
        <strong>Program:</strong> { program.title }<br />
        <ul>
          { actions.map((item, index) => (
            <li key={`item_${index}`}>
              { item.action === 'unconsented' &&
                <span>unsubscribed from all mailings</span>
              }
              { item.action === 'subscribed' &&
                <span>subscribed to { item.list }</span>
              }
              { item.action === 'resubscribed' &&
                <span>resubscribed to { item.list }</span>
              }
              { item.action === 'unsubscribed' &&
                <span>unsubscribed from { item.list }</span>
              }
            </li>
          )) }
        </ul>
      </div>
    )
  }

}

export default Preferences
