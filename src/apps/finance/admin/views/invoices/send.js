import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

const message = 'Here is a copy of your invoice.'

class Send extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { invoice } = this.props
    return {
      title: 'Send Invoice',
      method: 'patch',
      action: `/api/admin/finance/invoices/${invoice.id}/send`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'To', name: 'to', type: 'emailfield', placeholder: 'To', required: true, defaultValue: invoice.customer.email },
            { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Write a message...', required: true, rows: 10, defaultValue: message }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Send
