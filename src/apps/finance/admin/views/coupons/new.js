import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  state = {
    type: 'amount'
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { type } = this.state
    return {
      title: 'New Coupon',
      method: 'post',
      action: '/api/admin/finance/coupons',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Enter a code', required: true },
            { label: 'Product', name: 'product_id', type: 'lookup', placeholder: 'Choose a product', endpoint: '/api/admin/finance/products', value: 'id', text: 'title', required: true },
            { label: 'Type', name: 'type', type: 'radiogroup', options: [{value:'amount',text:'Fixed Amount'},{value:'percent',text:'Percent'}], required: true, defaultValue: type },
            ...this._getType(),
            {
              label: 'Restrictions',
              type: 'segment',
              fields: [
                { type: 'fields', fields: [
                  { label: 'Start Date', name: 'start_date', type: 'datefield', placeholder: 'Enter a start date'},
                  { label: 'End Date', name: 'end_date', type: 'datefield', placeholder: 'Enter an end date'}
                ] },
                { label: 'Max Uses', name: 'max_uses', type: 'numberfield', number_type: 'integer', placeholder: 'Enter a number, leave blank for infininte'}
              ]
            }
          ]
        }
      ]
    }
  }

  _getType() {
    const { type } = this.state
    if(type === 'amount') {
      return [
        { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount', required: true }
      ]
    } else {
      return [
        { label: 'Percent', name: 'percent', type: 'numberfield', number_type: 'float', placeholder: 'Enter a percent', required: true }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(key, value) {
    if(key === 'type') {
      this.setState({
        type: value
      })
    }
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default New
