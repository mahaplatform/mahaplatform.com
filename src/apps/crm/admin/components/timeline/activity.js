import ContactAvatar from '../../tokens/contact_avatar'
import { Avatar, Image } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Activities extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    configuration: PropTypes.object
  }

  static propTypes = {
    activity: PropTypes.object,
    contact: PropTypes.object
  }

  static defaultProps = {}

  state = {
    show: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { activity, contact } = this.props
    const { admin } = this.context
    const { show } = this.state
    const type = this.context.configuration.cards[activity.type]
    return (
      <div className="crm-timeline-card">
        <div className="crm-timeline-card-header" onClick={ this._handleToggle }>
          <div className="crm-timeline-card-header-toggle">
            { show ?
              <i className="fa fa-fw fa-chevron-down" /> :
              <i className="fa fa-fw fa-chevron-right" />
            }
          </div>
          <div className="crm-timeline-card-header-details">
            <div className="crm-timeline-card-header-description">
              { activity.user ?
                <strong>{ activity.user.full_name }</strong> :
                <strong>{ contact.display_name }</strong>
              } { activity.story }
            </div>
            { activity.program &&
              <div className="crm-timeline-card-header-program">
                <Image src={ activity.program.logo || admin.team.logo } transforms={{ fit: 'cover', w: 16, h: 16 }}/>
                { activity.program.title }
              </div>
            }
            <div className="crm-timeline-card-header-timestamp">
              { moment(activity.created_at).format('MMM DD, YYYY [at] h:mm A') }
            </div>
          </div>
          { false &&
            <div className="crm-timeline-card-header-tasks">
              <i className="fa fa-ellipsis-h" />
            </div>
          }
        </div>
        { show &&
          <div className="crm-timeline-card-section">
            <type.component activity={ activity } />
          </div>
        }
      </div>
    )
  }

  _getToggle() {
    const { show } = this.state
    return {
      label: show ? 'hide details' : 'show details',
      className: 'link',
      handler: this._handleToggle
    }
  }

  _handleToggle() {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

}

export default Activities
