import { Container } from '@admin'
import EventForm from '../../components/eventform'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Clone extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object,
    programs: PropTypes.array
  }

  render() {
    return <EventForm { ...this._getEventForm() } />
  }

  _getDefault() {
    const { event } = this.props
    return {
      ..._.omit(event, ['code']),
      ticket_types: event.ticket_types.map(ticket_type => {
        return _.omit(ticket_type, ['id'])
      }),
      sessions: event.sessions.map(session => {
        return _.omit(session, ['id'])
      })
    }
  }

  _getEventForm() {
    const { programs } = this.props
    return {
      action: '/api/admin/events/events',
      defaultValue: this._getDefault(),
      method: 'post',
      programs,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

}

const mapResources = (props, context) => ({
  event: `/api/admin/events/events/${props.event_id}/edit`
})

export default Container(mapResources)(Clone)
