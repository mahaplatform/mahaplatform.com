import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onBack: PropTypes.func,
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
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', required: true, placeholder: 'Enter a name' },
            { label: 'Email', name: 'email', type: 'emailfield', placeholder: 'Enter an optional email address' },
            { label: 'Phone', name: 'phone', type: 'phonefield', placeholder: 'Enter an optional phone number' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSuccess(session) {
    this.props.onDone(session)
  }

}


export default New
