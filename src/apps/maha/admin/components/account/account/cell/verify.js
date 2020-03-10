import { Form, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Verify extends React.Component {

  static propTypes = {
    onNext: PropTypes.func
  }

  state = {
    resend: false
  }

  _handleFailure = this._handleFailure.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Cell Phone',
      action: '/api/admin/account/cell/verify',
      method: 'post',
      saveText: 'Next',
      cancelText: null,
      cancelIcon: 'chevron-left',
      onFailure: this._handleFailure,
      onSuccess: this._handleSuccess,
      before: <Message { ...this._getMessage() } />,
      sections: [
        {
          fields: [
            { name: 'code', type: 'numberfield', placeholder: 'Enter Verification Code', maxLength: 6, required: true }
          ]
        }
      ]
    }
  }

  _getMessage() {
    return {
      icon: 'hashtag',
      backgroundColor: 'red',
      title: 'Verify Cell Phone',
      text: 'Enter your verification code'
    }
  }

  _handleFailure() {
    this.setState({
      resend: true
    })
  }

  _handleSuccess() {
    this.props.onNext()
  }

}

export default Verify
