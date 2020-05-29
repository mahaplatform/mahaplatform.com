import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Organizer',
      action: '/api/admin/events/organizers',
      method: 'post',
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

  _handleSuccess(organizer) {
    this.context.router.history.push(`/admin/events/organizers/${organizer.id}`)
    this.context.modal.close()
  }

}

export default New
