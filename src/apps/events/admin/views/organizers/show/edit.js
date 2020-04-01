import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    organizer: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { organizer } = this.props
    return {
      title: 'Edit Organizer',
      method: 'patch',
      endpoint: `/api/admin/events/organizers/${organizer.id}/edit`,
      action: `/api/admin/events/organizers/${organizer.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', required: true, placeholder: 'Enter a name' },
            { label: 'Email', name: 'email', type: 'emailfield', placeholder: 'Enter an optional email address' },
            { label: 'Phone', name: 'phone', type: 'phonefield', placeholder: 'Enter an optional phone number' },
            { label: 'Photo', name: 'photo_id', type: 'attachmentfield', prompt: 'Choose a photo' }
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
