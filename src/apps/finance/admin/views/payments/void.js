import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Void extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    payment: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { payment } = this.props
    return {
      title: 'Void Payment',
      method: 'patch',
      action: `/api/admin/finance/payments/${payment.id}/void`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'voided_at', type: 'datefield', placeholder: 'Date', required: true, defaultValue: moment() }
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

export default Void
