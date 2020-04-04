import EventForm from '../../components/eventform'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <EventForm { ...this._getEventForm() } />
  }

  _getEventForm() {
    const { programs } = this.props
    return {
      action: '/api/admin/events/events',
      method: 'post',
      programs,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(event) {
    this.context.router.history.push(`/admin/events/events/${event.id}`)
    this.context.modal.close()
  }

}

export default New
