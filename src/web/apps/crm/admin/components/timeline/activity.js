import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Activities extends React.PureComponent {

  static contextTypes = {
    configuration: PropTypes.object
  }

  static propTypes = {
    activity: PropTypes.object,
    contact: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity, contact } = this.props
    const type = this.context.configuration.cards[activity.type]
    return (
      <div className="crm-timeline-item">
        <div className="crm-timeline-item-rail">
          <div className={ `crm-timeline-item-icon ${type.color}` }>
            <i className={ `fa fa-${type.icon}` } />
          </div>
        </div>
        <div className="crm-timeline-item-content">
          <div className="crm-timeline-item-card">
            <div className="crm-timeline-item-card-header">
              <div className="crm-timeline-item-card-header-avatar">
                { activity.user ?
                  <Avatar user={ activity.user } width="28" presence={ false } /> :
                  <Avatar user={ contact } width="28" presence={ false } />
                }
              </div>
              <div className="crm-timeline-item-card-header-details">
                <div className="crm-timeline-item-card-header-description">
                  { activity.user ?
                    <strong>{ activity.user.full_name }</strong> :
                    <strong>{ contact.display_name }</strong>
                  } { activity.story }
                </div>
                <div className="crm-timeline-item-card-header-timestamp">
                  { moment(activity.created_at).format('MMM DD, YYYY [at] h:mm A') }
                </div>
                <div className="crm-timeline-item-card-header-remove">
                  <i className="fa fa-remove" />
                </div>
              </div>
            </div>
            <div className="crm-timeline-item-card-section">
              <type.component activity={ activity } />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getType(type) {

  }

}

export default Activities
