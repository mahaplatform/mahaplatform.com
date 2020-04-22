import React from 'react'
import PropTypes from 'prop-types'
import { Form, Message } from 'maha-admin'

class Authorize extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onCancel: PropTypes.func,
    onNext: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Cell Phone Verification',
      action: '/api/admin/account/cell/authorize',
      method: 'post',
      saveText: 'Next',
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      before: <Message { ...this._getMessage() } />,
      sections: [
        {
          fields: [
            { name: 'cell_phone', type: 'phonefield', placeholder: 'Enter Cell Phone', required: true }
          ]
        }
      ]
    }
  }

  _getMessage() {
    return {
      icon: 'phone',
      backgroundColor: 'red',
      title: 'Authorize Your Cell Phone',
      text: 'If you authorize your cell phone, Maha can send you notifications via text message.'
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleSuccess() {
    this.props.onNext()
  }

}

export default Authorize
