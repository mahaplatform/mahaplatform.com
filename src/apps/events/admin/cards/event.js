import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Event extends React.PureComponent {

  static propTypes = {
    activity: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { activity } = this.props
    const { program } = activity
    return (
      <div className="crm-timeline-item-form-note">
        <strong>Program:</strong> { program.title }<br />
        <strong>Event:</strong> <Button { ...this._getEvent() } /><br />
        <Button { ...this._getRegistration() } />
      </div>
    )
  }

  _getEvent() {
    const { activity } = this.props
    const { data } = activity
    return {
      label: data.event.title,
      className: 'link',
      route: `/admin/events/events/${data.event.id}`
    }
  }

  _getRegistration() {
    const { activity } = this.props
    const { data } = activity
    return {
      label: 'View Registration',
      className: 'link',
      route: `/admin/events/events/${data.event.id}/registrations/${data.registration.id}`
    }
  }

}

export default Event
