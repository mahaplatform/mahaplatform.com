import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class Send extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    user: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { invoice, user } = this.props
    const item = invoice.status === 'paid' ? 'receipt' : 'invoice'
    const subject = `Your ${item}`
    const message = `Here is a copy of your ${item}.`
    return {
      title: `Send ${_.capitalize(item)}`,
      method: 'patch',
      action: `/api/admin/finance/invoices/${invoice.id}/send`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${invoice.program.id}/senders`, value: 'id', text: 'rfc822', required: true },
            { label: 'To', name: 'to', type: 'emailfield', placeholder: 'To', required: true, defaultValue: invoice.customer.email },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter an email address', defaultValue: user.email },
            { label: 'Subject', name: 'subject', type: 'textfield', placeholder: 'Enter a subject', required: true, defaultValue: subject },
            { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Enter a message', required: true, rows: 10, defaultValue: message }
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

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Send)
