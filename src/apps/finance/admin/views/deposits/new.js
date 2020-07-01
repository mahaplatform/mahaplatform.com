import PaymentsField from '../../components/paymentsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Deposit',
      method: 'post',
      action: '/api/admin/finance/deposits',
      successText: 'Save',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Bank Account', name: 'bank_id', type: 'lookup', endpoint: '/api/admin/finance/banks', value: 'id', text: 'title', required: true },
            { label: 'Payments', name: 'payment_ids', type: PaymentsField, required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(deposit) {
    this.context.router.history.push(`/admin/finance/deposits/${deposit.id}`)
    this.context.modal.close()
  }

}

export default New
