import EventForm from '../../components/eventform'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <EventForm { ...this._getEventForm() } />
  }

  _getEventForm() {
    const { event } = this.props
    return {
      method: 'patch',
      endpoint: `/api/admin/events/events/${event.id}/edit`,
      action: `/api/admin/events/events/${event.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
