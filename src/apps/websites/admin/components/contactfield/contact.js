import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Contact extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const contact = this.props.contact || {}
    return {
      title: 'Contact',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', required: true, placeholder: 'Enter First Name', defaultValue: contact.first_name },
            { label: 'Last Name', name: 'last_name', type: 'textfield', required: true, placeholder: 'Enter Last Name', defaultValue: contact.last_name },
            { label: 'Email', name: 'email', type: 'emailfield', required: true, placeholder: 'Enter Email', defaultValue: contact.email },
            { label: 'Phone', name: 'phone', type: 'phonefield', required: true, placeholder: 'Enter Phone', defaultValue: contact.phone },
            { label: 'Address', name: 'address', type: 'addressfield', required: true, placeholder: 'Enter Address', defaultValue: contact.address }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSuccess(contact) {
    this.props.onDone(contact)
  }

}

export default Contact
