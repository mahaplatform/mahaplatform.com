import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { event } = this.props
    return {
      title: 'New Event',
      method: 'patch',
      endpoint: `/api/admin/events/events/${event.id}/edit`,
      action: `/api/admin/events/events/${event.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(event) {
    this.context.modal.close()
  }

}


export default Edit
