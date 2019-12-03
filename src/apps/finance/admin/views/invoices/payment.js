import Card from '../../components/card'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Payment extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object
  }

  state = {
    method: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { method } = this.state
    const { invoice } = this.props
    return {
      title: 'Receive Payment',
      method: 'post',
      action: `/api/admin/finance/invoices/${invoice.id}/payments`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', placeholder: 'Date', required: true, defaultValue: moment() },
            { label: 'Method', name: 'method', type: 'lookup', placeholder: 'Choose a payment method', options:[{value:'card',text:'Credit Card'},{value:'check',text:'Check'},{value:'cash',text:'Cash'},{value:'credit',text:'Customer Credit'},{value:'scholarship',text:'Scholarship'}], required: true, defaultValue: method },
            ...this._getMethodFields()
          ]
        }
      ]
    }
  }

  _getMethodFields() {
    const { invoice } = this.props
    const { method } = this.state
    if(method === 'cash') {
      return [
        { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount', required: true }
      ]
    } else if(method === 'card') {
      return [
        { label: 'Merchant', name: 'merchant_id', type: 'lookup', placeholder: 'Choose a merchant account', endpoint: '/api/admin/finance/merchants', value: 'id', text: 'title', required: true },
        { label: 'Credit Card', name: 'payment', type: Card, color: 'blue' },
        { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount', required: true }
      ]
    } else if(method === 'check') {
      return [
        { label: 'Check #', name: 'reference', type: 'textfield', placeholder: 'Enter an check number', required: true },
        { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount', required: true }
      ]
    } else if(method === 'credit') {
      return [
        { label: 'Credit', name: 'credit_id', type: 'lookup', placeholder: 'Choose a credit', endpoint: `/api/admin/finance/customers/${invoice.customer.id}/credits`, value: 'id', text: 'id', required: true },
        { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount', required: true }
      ]
    } else if(method === 'scholarship') {
      return [
        { label: 'Scholarship', name: 'scholarship_id', type: 'lookup', placeholder: 'Choose a scholarship', endpoint: `/api/admin/finance/customers/${invoice.customer.id}/scholarships`, value: 'id', text: 'id', form: this._getScholarshipForm(), required: true },
        { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount', required: true }
      ]
    }
    return []
  }


  _getScholarshipForm() {
    const { invoice } = this.props
    return {
      title: 'New Scholarship',
      method: 'post',
      action: `/api/admin/finance/customers/${invoice.customer.id}/scholarships`,
      sections: [
        {
          fields: [
            { label: 'Amount', name: 'amount', type: 'moneyfield' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(key, value) {
    if(key === 'method') {
      this.setState({
        method: value
      })
    }
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Payment
