import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Organizer',
      action: '/api/admin/events/organizers',
      method: 'post',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
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

  _handleBack() {
    this.context.form.pop(-2)
  }

  _handleSuccess(organizer) {
    this.props.onDone(organizer)
  }

}


export default New
