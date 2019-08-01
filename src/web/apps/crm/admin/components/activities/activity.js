import Transaction from './cards/transaction'
import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import Blast from './cards/blast'
import Email from './cards/email'
import Event from './cards/event'
import Visit from './cards/visit'
import Call from './cards/call'
import Form from './cards/form'
import File from './cards/file'
import Note from './cards/note'
import moment from 'moment'
import React from 'react'

class Activities extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object,
    contact: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity, contact } = this.props
    const type = this._getType(activity.type)
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
                  { moment(activity.created_at).format('MMMM D @ h:mm A') }
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
    if(type === 'blast') return {
      component: Blast,
      color: 'yellow',
      icon: 'paper-plane'
    }
    if(type === 'call') return {
      component: Call,
      color: 'teal',
      icon: 'phone'
    }
    if(type === 'email') return {
      component: Email,
      color: 'brown',
      icon: 'envelope'
    }
    if(type === 'event') return {
      component: Event,
      color: 'red',
      icon: 'calendar'
    }
    if(type === 'file') return {
      component: File,
      color: 'pink',
      icon: 'file'
    }
    if(type === 'form') return {
      component: Form,
      color: 'purple',
      icon: 'check-square'
    }
    if(type === 'note') return {
      component: Note,
      color: 'orange',
      icon: 'pencil'
    }
    if(type === 'transaction') return {
      component: Transaction,
      color: 'green',
      icon: 'dollar'
    }
    if(type === 'visit') return {
      component: Visit,
      color: 'blue',
      icon: 'mouse-pointer'
    }
  }

}

export default Activities
